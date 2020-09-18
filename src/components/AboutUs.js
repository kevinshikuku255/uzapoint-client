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


const content =  <div>
                  <b>WindowShop is guided by basic principles:</b> <br/>
                   Passion for invention  and commitment for excellence.
                  <br/> <br/>
                  The website was created and maintained to bring you closer to your cravings.  Here  dispose items for people to hit you up or Search for Items you love <br/><br/>
                  <p> I (Kevin Shikuku) and my team value you and We are obsessed to bring the best.</p>
                </div>

const panels = [
  {
    key: 1,
    title:" About us",
    content: {content}
  },
  {
    key: 2,
    title:"Constact us",
    content: "For any Info, Advertising, Reports or Contributions on Quality of our service Call or WhatsApp: 0740253367  your support to us will be apreciated"
  },
  {
    key: 3,
    title:" Disclaimer",
    content: "We dont claim any direct responsibilty for content pushlished on our platform.       Users are warned to be careful on who the get into transuction with. Content on manupilation, intimidation and descrimination  are not allowed."
  }
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