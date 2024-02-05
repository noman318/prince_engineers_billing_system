import Client from "../models/client.model.js";
import User from "../models/user.model.js";

const createClient = async (req, res, next) => {
  //   console.log("req.body", req.body);

  const { name, email, GST_No, address } = req.body;
  try {
    const createNewClient = await Client.create({
      user: req.user._id,
      name,
      email,
      address,
      GST_No,
    });
    res.json(createNewClient);
  } catch (error) {
    console.log("error", error);
    next(error);
  }
};

const getAllClients = async (req, res, next) => {
  try {
    const getClients = await Client.find({}).populate({
      path: "user",
      model: User,
      select: "name email _id isAdmin",
    });
    return res.json(getClients);
  } catch (error) {
    next(error);
  }
};

const getClientById = async (req, res, next) => {
  const { id } = req.params;
  //   console.log("id", id);
  try {
    const client = await Client.findById(id).populate({
      path: "user",
      model: User,
      select: "name email _id isAdmin",
    });
    if (client) {
      return res.json(client);
    }
    throw new Error("Client not found");
  } catch (error) {
    next(error);
  }
};

const updateClientById = async (req, res, next) => {
  const { id } = req.params;
  const { name, email, GST_No, address } = req.body;

  try {
    const client = await Client.findById(id);
    if (!client) {
      throw new Error("Client not found");
    }
    const updateClient = await Client.findByIdAndUpdate(
      id,
      {
        $set: {
          name,
          email,
          address,
          GST_No,
        },
      },
      { new: true }
    );
    return res.json(updateClient);
  } catch (error) {
    next(error);
  }
};

const deleteClient = async (req, res, next) => {
  const { id } = req.params;
  try {
    const client = await Client.findById(id);
    // console.log("client", client);
    if (client) {
      const deletedClient = await Client.findOneAndDelete({ _id: id });
      // console.log("deletedClient", deletedClient);
      return res.json(deletedClient);
    } else {
      throw new Error("Client not Found");
    }
  } catch (error) {
    next(error);
  }
};

export {
  createClient,
  getAllClients,
  getClientById,
  updateClientById,
  deleteClient,
};
