import {
  createClientService,
  deleteClientByIdService,
  getAllClientsService,
  getClientByNameService,
  getClientCountService,
  updateClientService,
} from "../service/client.service.js";

export const createClient = async (req, res) => {
  try {
    const newClient = await createClientService(req.body);
   res.status(201).json({ success: true, clients: newClient });

  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const updateClient = async (req, res) => {
  const { id } = req.params;
  try {
    const updated = await updateClientService(req.body, id);
    res.status(200).json({ updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getAllClients = async (req, res) => {
  try {
    const clients = await getAllClientsService(req.params.user_id);
    res.status(200).json({ clients });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getClientByName = async (req, res) => {
  try {
    const clients = await getClientByNameService(req.params.first_name);
    res.status(200).json({ clients });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const deleteClientById = async (req, res) => {
  try {
    const count = await deleteClientByIdService(req.params.id);
    res.status(200).json({ deleted: count > 0 });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getClientCount = async (req, res) => {
  try {
    const count = await getClientCountService(req.params.user_id);
    res.status(200).json({ count });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
