import React, { useState, useEffect, useMemo} from 'react';

import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import debounce from 'lodash.debounce';

const IssuePicker = ({ id, value = [], onChange = () => { }, label }) => {
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
      
      // TODO: Request issues for the incoming "values" props (currently the options could not have enough data)
      
      return options.filter(({ value }) => !selectedValuesAsObject[value]);
    },
    [options, value],
  )
  
  const searchIssues = async (query = '') => {
    try {
      const { AP } = global;
      
      if (AP) {
        const data = await AP.request('/rest/api/3/issue/picker', {
          maxResults: 10,
          startAt: 0,
          data: {
            query,
            showSubTasks: true,
          }
        });
        
        if (data && data.body) {
          const issuePickerSections = JSON.parse(data.body)?.sections;
          
          if (issuePickerSections) {
            const issuesList = issuePickerSections.reduce((acc, curSection) => {
              if (curSection?.issues) {
                return [ ...acc, ...curSection.issues];
              }
              return acc;
            }, []);

            const newOptions = issuesList
              .filter((issue, index, originalArray)=> originalArray.findIndex((el)=>(el.id===issue.id)) === index)
              .map(({ key, summaryText, }) => ({
                label: `${key} ${summaryText}`,
                value: key,
              }));

            setOptions(
              newOptions
            );
          }
        } else {
          throw new Error('Empty data or data.body');
        }
      }
    } catch (error) {
      console.error('IssuePicker --- Exception ---', error)
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
  
  const handleChange = (e, newValue) => {
    onChange(newValue);
  };
  
  const handleSearch = debounceEvent(
    (event) => {
      const { value } = event.target;
      
      if (value && value.length > 0) {
        ssearchIssues(value);
      } else {
        searchIssues();
      }
    },
    500,
  );
  
  const handleBlur = debounceEvent(
    () => {
      searchIssues();
    },
  );
  
  useEffect(
    () => {
      searchIssues();
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
          placeholder="Search issues..."
          onChange={handleSearch}
        />
      )}
    />
  );
}

export default IssuePicker;
