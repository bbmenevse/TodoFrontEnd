import { apiClient } from "./ApiClientBase"

export const retrieveAllTodosForUserNameApi = async (userName) => {
  try {
    const todosResponse = await apiClient.get(`/api/${userName}/todos`)
    return todosResponse.data;
  } catch (error) {
    console.log("Error: "+error)
    //throw error
  }
};

export const deleteTodoApi = async (userName, id) =>
{
  return await apiClient.delete(`/api/${userName}/todos/${id}`)
}

export const updateTodoApi = async (userName, id, todo) =>
{
  return await  apiClient.put(`/api/${userName}/todos/${id}`,todo)
}

export const createTodoApi = async (userName,todo) =>
{
  return await apiClient.post(`/api/${userName}/todos`,todo)
}

export const loginServiceApi = async (emailAdress, password) => {
  const data = {
    emailAdress: emailAdress,
    password: password,
  }

  try {
    const response = await apiClient.post('/api/login', data)

    return response; // Assuming the token is in the response data
  } catch (error) {
    // Handle error (e.g., display an error message)
    console.error('Error during login:', error)
    throw error
  }
}

export const registerServiceApi = async (firstName,lastName,emailAdress, password) => {
  const data = {
    firstName: firstName,
    lastName: lastName,
    emailAdress: emailAdress,
    password: password,
  }

  try {
    const response = await apiClient.post('/api/register', data)

    return response; // Assuming the token is in the response data
  } catch (error) {
    // Handle error (e.g., display an error message)
    console.error('Error during register:', error)
    throw error
  }
}




