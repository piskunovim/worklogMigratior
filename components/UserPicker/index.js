import React, { useEffect, useState } from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const UserPicker = ({ id, value, onChange }) => {
  const [options, setOptions] = useState([]);

  const handleChange = (data) => {
    console.log('data', data);

    onChange(data);
  };

  useEffect(
    () => {
      const { AP } = global;

      AP.request({

      });
    },
    [],
  );

  return (
    <Autocomplete
      multiple
      id={id}
      options={options}
      getOptionLabel={(option) => option.title}
      defaultValue={value}
      onChange={handleChange}
      filterSelectedOptions
      renderInput={(params) => (
        <TextField
          {...params}
          label="user-displayname"
          placeholder="Name"
        />
      )}
    />
  );
};

export default UserPicker;