/*
 * Copyright 2021 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { SelectItem } from '@backstage/core-components';
import { RepoUrlPickerState } from './types';
import Autocomplete from '@material-ui/lab/Autocomplete';
import TextField from '@material-ui/core/TextField';

export const GithubRepoPicker = (props: {
  allowedOwners?: string[];
  rawErrors: string[];
  state: RepoUrlPickerState;
  onChange: (state: RepoUrlPickerState) => void;
}) => {
  const { allowedOwners = [], rawErrors, state, onChange } = props;
  const ownerItems: SelectItem[] = allowedOwners
    ? allowedOwners.map(i => ({ label: i, value: i }))
    : [{ label: 'Loading...', value: 'loading' }];

  const { owner } = state;

  return (
    <>
      <FormControl
        margin="normal"
        required
        error={rawErrors?.length > 0 && !owner}
      >
        {allowedOwners?.length ? (
          <Autocomplete
          aria-label="Owner Available"
          options={ownerItems}
          getOptionLabel={(owners) => owners.label || "error getting label"}
          disabled={allowedOwners.length === 1}
          data-testid="select"
          freeSolo
          onChange={selected =>
            onChange({
              owner: String(Array.isArray(selected) ? selected[0] : selected),
            })
          } 
          tabIndex={0}
          renderInput={params => (
              <TextField
              {...params}
              placeholder="Owner Available"
              margin="dense"
              FormHelperTextProps={{ margin: 'dense', style: { marginLeft: 0 } }}
              variant="outlined"
              InputProps={params.InputProps}
              
              
            />
          )}
          />
        ) : (
          <>
            <InputLabel htmlFor="ownerInput">Owner</InputLabel>
            <Input
              id="ownerInput"
              onChange={e => onChange({ owner: e.target.value })}
              value={owner}
            />
          </>
        )}
        <FormHelperText>
          The organization, user or project that this repo will belong to
        </FormHelperText>
      </FormControl>
    </>
  );
};
