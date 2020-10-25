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
  },
  h4:{
    color:"skyBlue",
    fontSize:"2rem",
    fontStyle:"italic",
    fontStretch:"condensed",
  }
}));


const content =  (
           <>
              <div>
                  <p> Are you trying sell or just disposing your old items? Quite sure you have expericed (Unnoticed ) posts on Facebook, Instagram,Twitter or WhatsApp status to your target customers.</p>

                  <p style={{color:"blue"}}>Windoshoppe is here bring relevance to your posts. Take a photo of an Item, give it a description with its price and post it on Windoshoppe and make your target customers reach you fast.</p>
                  <p >Make extra cash with Windoshoppe</p>
             </div>
          </>
                )





const panels = [
  {
    key: 1,
    title:" ABOUT US",
    content: {content}
  },
  {
    key: 2,
    title:"CONTACT US",
    content: "For any Info, Advertising, Reports or Contributions" +
             " on Quality of our service Call or WhatsApp: 0740253367 your feedback will be apreciated"
  },
  {
    key: 3,
    title:" DISCLAIMER",
    content: "We dont claim any direct responsibilty for content published on our platform.       Users are warned to be careful on who the get into transuction with. Content on manupilation, intimidation and descrimination  are not allowed."
  },
  {
    key: 4,
    title:" NOTICE",
    content: "If you are intrested in what we are doing and want us to keep running, reach out and let us have a conversation on the same. Thank you."
  }
]



const AboutUs = () => {
  const classes = useStyles();
    return(
    <>
    <div className={classes.paragraph}>
      <h4 className={classes.h4}>Windoshoppe </h4>
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