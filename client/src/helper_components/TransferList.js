import * as React from 'react';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import {Typography} from '@mui/material'

function filterAndImplyTags(tagCategories,tags)
{
  var implicationFilter = []
  tagCategories.forEach((tag) =>implicationFilter.push(tag.category))
  tags = tags.filter(tag=>implicationFilter.indexOf(tag)<0)
  return tags
}
function not(a, b) {
  return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
  return a.filter((value) => b.indexOf(value) !== -1);
}

function TransferList() {
  const [tagCategories, setTagCategories] = React.useState([
    {
        "category":"Departments",
        "color":"#0d3394",
        "subCategories":
        [
            "College of Agriculture",
            "Reginald F. Lewis College of Business",
            "College of Education",
            "College of Engineering and Technology",
            "College of Humanities and Social Sciences",
            "College of Natural and Health Sciences"
        ]
    },
    {
        "category":"Buildings",
        "color":"#94260d",
        "subCategories":["Hunter McDaniel Building","Engineering and Technology Building","Lula Johnson Hall"]
    },
    {
        "category":"Residency",
        "color":"#945e0d",
        "subCategories":
        [
            "Freshman Housing",
            "Upperclass Housing",
            "Branch Hall",
            "Otelia Howard Hall",
            "Lucretia Campbell Hall",
            "Langston Hall",
            "Seward Hall",
            "Quad I",
            "Williams Hall",
            "Gateway Hall",
            "Moore Hall",
            "Quad II",
            "Whiting Hall"
        ]
    }
  ])
  const setIndividualTags = () =>
  {
    var individualTags = []
    tagCategories.forEach((tag) =>
    {
      individualTags = individualTags.concat(tag.subCategories)
    })
    return individualTags
  }
  const [tags, setTags] = React.useState(setIndividualTags)
  const [checked, setChecked] = React.useState([]);
  const [left, setLeft] = React.useState(tags);
  const [right, setRight] = React.useState([]);

  const leftChecked = intersection(checked, left);
  const rightChecked = intersection(checked, right);

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  const handleAllRight = () => {
    setRight(right.concat(left));
    var filtered = filterAndImplyTags(tagCategories,right)
    localStorage.setItem("chosen-tags", JSON.stringify(right))
    setLeft([]);
  };

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked));
    var filtered = filterAndImplyTags(tagCategories,leftChecked)
    localStorage.setItem("chosen-tags",JSON.stringify(right.concat(filtered)))
    setLeft(not(left, leftChecked));
    setChecked(not(checked, leftChecked));
  };

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked));
    setRight(not(right, rightChecked));
    localStorage.setItem("chosen-tags", JSON.stringify(not(right,rightChecked)))
    setChecked(not(checked, rightChecked));
  };

  const handleAllLeft = () => {
    setLeft(left.concat(right));
    localStorage.setItem("chosen-tags", JSON.stringify([]))
    setRight([]);
  };

  const customList = (items) => (
    <Paper sx={{ width: '35vw', height: 230, overflow: 'auto' }}>
      <List dense component="div" role="list">
        {items.map((value) => {
          const labelId = `transfer-list-item-${value}-label`;

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    'aria-labelledby': labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText disableTypography primary={<Typography sx={{color:'black'}}>{value}</Typography>}  id={labelId} />
            </ListItem>
          );
        })}
      </List>
    </Paper>
  );

  return (
    <Grid container spacing={2} justifyContent="center" alignItems="center">
      <Grid item>{customList(left)}</Grid>
      <Grid item>
        <Grid container direction="column" alignItems="center">
          <Button
            sx={{ my: 0.5 }}
            variant="contained"
            size="small"
            onClick={handleAllRight}
            disabled={left.length === 0}
            aria-label="move all right"
          >
            ≫
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="contained"
            size="small"
            onClick={handleCheckedRight}
            disabled={leftChecked.length === 0}
            aria-label="move selected right"
          >
            &gt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="contained"
            size="small"
            onClick={handleCheckedLeft}
            disabled={rightChecked.length === 0}
            aria-label="move selected left"
          >
            &lt;
          </Button>
          <Button
            sx={{ my: 0.5 }}
            variant="contained"
            size="small"
            onClick={handleAllLeft}
            disabled={right.length === 0}
            aria-label="move all left"
          >
            ≪
          </Button>
        </Grid>
      </Grid>
      <Grid item>{customList(right)}</Grid>
    </Grid>
  );
}

export default TransferList;