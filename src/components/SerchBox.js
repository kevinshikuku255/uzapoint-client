import React from 'react'
import { Accordion } from 'semantic-ui-react'
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';




const useStyles = makeStyles((theme) => ({
  card: {
    minWidth: 300,
    maxWidth:518,
  },
  media: {
    height: 190,
  },
  paragraph:{
     margin: theme.spacing(8,1,0,1),
    overflowWrap:"break-word"
  }
}));




const panels = [
  {
    key: 1,
    title:" Search",
    content: "This feature will be added soon... You will be able to serch throught items and find what you want."
  },
]



const AboutUs = () => {
  const classes = useStyles();
    return(
    <>

    <div className={classes.paragraph}>
      <h4>Windowshop </h4>
    </div>
      <Card className={classes.card}>
      <Accordion
        defaultActiveIndex={[0]}
        panels={panels}
        exclusive={false}
        fluid
      />
      </Card>
    </>
    )
}

export default AboutUs;