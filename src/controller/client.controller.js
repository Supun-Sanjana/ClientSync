import {
  createClientService,
  getAllClientsService,
  updateClientService,
} from "../service/client.service.js";

//create client
export const createClient = async (req, res) => {
  try {
    const clients = req.body; // can be an object or an array

    // normalize to array
    const clientsArray = Array.isArray(clients) ? clients : [clients];

    const insertedClients = [];
    for (const client of clientsArray) {
      const newClient = await createClientService(client);
      insertedClients.push(newClient);
    }

    return res.status(201).json({ success: true, clients: insertedClients });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

//update client
export const updateClient = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedClient = await updateClientService(req.body, id);

    if (!updatedClient) {
      return res.status(404).json({ success: false, message: `Client with ID ${id} not found` });
    }


    return res.status(200).json({ "updated client : ": updatedClient });
  } catch (error) {
    console.log(error.message || error);
    res.status(500).json({ message: error.message || error });
  }
};

//get all clients
export const getAllClients = async (req, res)=>{
    try {
       const clients  =await getAllClientsService();
       return res.status(200).json({"clients : ": clients})
        
    } catch (error) {
        console.log(error.message || error);
        res.status(500).json({"message":error.message || error})
    }
}

