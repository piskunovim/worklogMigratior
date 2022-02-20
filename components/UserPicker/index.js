import React, { useEffect, useMemo, useState } from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import debounce from 'lodash.debounce';

const UserPicker = ({ id, value = [], onChange = () => { }, label }) => {
  const [options, setOptions] = useState([]);

  const filteredOptions = useMemo(
    () => {
      const selectedValuesAsObject = value
        .reduce(
          (acc, current) => {
            acc[current.value] = true;

            return acc;
          },
          {},
        );

      return options.filter(({ value }) => !selectedValuesAsObject[value]);
    },
    [options, value],
  )

  const handleChange = (e, newValue) => {
    onChange(newValue);
  };

  const searchUsers = async (query) => {
    try {
      const { AP } = global;

      if (AP) {
        const data = await AP.request('/rest/api/3/user/search', {
          maxResults: 10,
          startAt: 0,
          data: {
            query,
          }
        });

        if (data && data.body) {
          const newOptions = JSON.parse(data.body);

          setOptions(
            newOptions
              .filter(({ accountType }) => accountType !== 'app')
              .map(({ displayName: label, accountId: value }) => ({ label, value }))
          );
        } else {
          throw new Error('Empty data or data.body');
        }
      }
    } catch (error) {
      console.error('UserPicker --- Exception ---', error)
      setOptions([]);
    }
  };

  const debounceEvent = (...args) => {
    const debouncedEvent = debounce(...args);

    return (event) => {
      event.persist();

      return debouncedEvent(event);
    };
  };

  const handleSearch = debounceEvent(
    (event) => {
      const { value } = event.target;

      if (value && value.length > 0) {
        searchUsers(value);
      } else {
        searchUsers('.');
      }
    },
    500,
  );

  const handleBlur = debounceEvent(
    () => {
      searchUsers('.');
    },
  );

  useEffect(
    () => {
      searchUsers('.');
    },
    [],
  );

  return (
    <Autocomplete
      multiple
      id={id}
      style={{
        minWidth: 253,
      }}
      options={filteredOptions}
      defaultValue={value}
      onChange={handleChange}
      onBlur={handleBlur}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          placeholder="Search users..."
          onChange={handleSearch}
        />
      )}
    />
  );
};

export default UserPicker;
