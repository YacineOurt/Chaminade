import axios from "axios";

const groupe_token = process.env.EXPO_PUBLIC_API_KEY

async function get_token(_email, _password) {
  const config = {
    headers: { 'X-Group-Authorization': groupe_token }
  };
  const body = { email: _email, password: _password };

  try {
    const response = await axios.post(process.env.EXPO_PUBLIC_API_URL + "employees/login", body, config);

    return {
      status: response.status,
      data: response.data
    };
  } catch (error) {
    return {
      status: error.response.status,
      data: null
    };
  }
}

async function get_employees(user_token) {
  try {
    const response = await axios.get(process.env.EXPO_PUBLIC_API_URL + 'employees', {
      headers: {
        'X-Group-Authorization': groupe_token,
        'Authorization': 'Bearer ' + user_token,
      },
    });

    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    if (error.response) {
      return {
        status: error.response.status,
        data: null,
      };
    } else {
      throw error;
    }
  }
}

async function get_employees_image(user_token, id) {
  try {
    const response = await axios.get(process.env.EXPO_PUBLIC_API_URL + `employees/${id}/image`, {
      headers: {
        'X-Group-Authorization': groupe_token,
        'Authorization': 'Bearer ' + user_token,
      },
    });

    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    if (error.response) {
      console.error("error getting images")
      return {
        status: error.response.status,
        data: null,
      };
    } else {
      throw error;
    }
  }
}


async function get_me(user_token)
{
  try {
    const config = {
        method: 'get',
        maxBodyLength: Infinity,
        url: process.env.EXPO_PUBLIC_API_URL + 'employees/me',
        headers: {
            'X-Group-Authorization': groupe_token,
            'Authorization': 'Bearer ' + user_token
        }
    };
    const response = await axios(config)
    return response;
    } catch (error) {
      console.log(error);
      throw error
    }
}

function get_leaders(user_token)
{
    var config = {
        method: 'get',
      maxBodyLength: Infinity,
        url: process.env.EXPO_PUBLIC_API_URL + 'employees/leaders',
        headers: {
            'X-Group-Authorization': groupe_token,
            'Authorization': 'Bearer ' + user_token
        }
      };

      axios(config);
}

async function get_employees_info(user_token, id)
{
  try {
    const response = await axios.get(process.env.EXPO_PUBLIC_API_URL + `employees/${id}`, {
      headers: {
        'X-Group-Authorization': groupe_token,
        'Authorization': 'Bearer ' + user_token,
      },
    });

    return {
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    if (error.response) {
      console.error("error getting images")
      return {
        status: error.response.status,
        data: null,
      };
    } else {
      throw error;
    }
  }
}

module.exports = {
  get_employees,
  get_employees_info,
  get_employees_image,
  get_leaders,
  get_me,
  get_token,
}
