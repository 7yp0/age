import { Checkbox, FormControlLabel } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { isNil, split } from 'ramda';
import * as React from 'react';
import {
  createChangeClickableAction,
  createSetClickableActiveAction,
} from '../../../actions/clickables';
import { createSelectClickableByPolygonId } from '../../../selectors/clickables';
import { Consumer } from '../../uiState';

interface Props {
  polygon: Polygon;
}

const ClickableMenu = (props: Props) => (
  <Consumer>
    {({ state, dispatch }) => {
      const clickable = createSelectClickableByPolygonId(props.polygon.id)(
        state,
      );

      if (isNil(clickable)) {
        return;
      }

      const {
        script: { moduleName, functionName, args },
      } = clickable;

      const moduleNameValue = moduleName || '';
      const functionNameValue = functionName || '';
      const argsValue = args || [];

      return (
        <div>
          <TextField
            label="Module Name"
            value={moduleNameValue}
            onChange={({
              target: { value },
            }: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(
                createChangeClickableAction(
                  props.polygon.id,
                  value,
                  functionNameValue,
                  argsValue,
                ),
              );
            }}
          />
          <br />
          <TextField
            label="Function Name"
            value={functionNameValue}
            onChange={({
              target: { value },
            }: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(
                createChangeClickableAction(
                  props.polygon.id,
                  moduleNameValue,
                  value,
                  argsValue,
                ),
              );
            }}
          />
          <br />
          <TextField
            label="Arguments"
            helperText="split by ','"
            value={args}
            onChange={({
              target: { value },
            }: React.ChangeEvent<HTMLInputElement>) => {
              dispatch(
                createChangeClickableAction(
                  props.polygon.id,
                  moduleNameValue,
                  functionNameValue,
                  split(',', value),
                ),
              );
            }}
          />
          <br />
          <FormControlLabel
            control={
              <Checkbox
                checked={clickable.active}
                onChange={({
                  target: { checked },
                }: React.ChangeEvent<HTMLInputElement>) => {
                  dispatch(
                    createSetClickableActiveAction(
                      clickable.polygonId,
                      checked,
                    ),
                  );
                }}
              />
            }
            label="Active"
          />
        </div>
      );
    }}
  </Consumer>
);

export default ClickableMenu;
