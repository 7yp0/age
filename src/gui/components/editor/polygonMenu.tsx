import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Typography from '@material-ui/core/Typography';
import { always, cond, equals, isNil, not, or } from 'ramda';
import * as React from 'react';
import {
  createAddClickableAction,
  createRemoveClickableAction,
} from '../../../actions/clickables';
import { createDeletePolygonAction } from '../../../actions/polygons';
import { PolygonTypes } from '../../../configs/polygons';
import { createSelectClickableByPolygonId } from '../../../selectors/clickables';
import {
  selectIsPolygonSelected,
  selectSelectedPolygon,
} from '../../../selectors/polygons';
import { Consumer } from '../../uiState';
import ClickableMenu from './ClickableMenu';

const PolygonMenu = () => (
  <Consumer>
    {({ state, dispatch }) => {
      const isPolygonSelected = selectIsPolygonSelected(state);
      const polygon = selectSelectedPolygon(state);

      if (or(isNil(polygon), not(isPolygonSelected))) {
        return null;
      }

      const selectedPolygon = polygon as Polygon;

      const clickable = createSelectClickableByPolygonId(selectedPolygon.id)(
        state,
      );

      const currentValue = cond([
        [equals(not(clickable)), always(PolygonTypes.None)],
        [equals(Boolean(clickable)), always(PolygonTypes.Clickable)],
      ])(true);

      return (
        <div>
          <div>
            <Typography>ID:</Typography>
            <Input
              value={selectedPolygon.id}
              readOnly={true}
              fullWidth={true}
            />
          </div>
          <br />
          <Button
            color="secondary"
            variant="contained"
            onClick={() => {
              dispatch(createDeletePolygonAction(selectedPolygon.id));
            }}
          >
            Delete Polygon
          </Button>
          <br />
          <br />
          <Typography>Type:</Typography>
          <Select
            autoWidth={true}
            value={currentValue}
            onChange={({
              target: { value },
            }: React.ChangeEvent<HTMLSelectElement>) => {
              const eventValue = (value as unknown) as PolygonTypes;

              if (equals(currentValue, eventValue)) {
                return;
              }

              cond([
                [
                  equals(PolygonTypes.Clickable),
                  () => {
                    dispatch(createRemoveClickableAction(selectedPolygon.id));
                  },
                ],
              ])(currentValue);

              cond([
                [
                  equals(PolygonTypes.Clickable),
                  () => {
                    dispatch(createAddClickableAction(selectedPolygon.id));
                  },
                ],
              ])(eventValue);
            }}
          >
            <MenuItem value={PolygonTypes.None}>None</MenuItem>
            <MenuItem value={PolygonTypes.Clickable}>Clickable</MenuItem>
            <MenuItem value={PolygonTypes.Collideable}>Collideable</MenuItem>
            <MenuItem value={PolygonTypes.Boundary}>Boundary</MenuItem>
          </Select>
          <br />
          {equals(currentValue, PolygonTypes.Clickable) && (
            <ClickableMenu polygon={selectedPolygon} />
          )}
        </div>
      );
    }}
  </Consumer>
);

export default PolygonMenu;
