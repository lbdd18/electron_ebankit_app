
import {Box, Grid, Card, CardMedia, CardContent, Image, Typography, IconButton} from '@material-ui/core'
import { FiUpload } from 'react-icons/fi';

import { Container, Content, Title } from "./styles";

interface Post {
  id: string;
  imageURL: string;
  title: string;
  category: string;
  shortDescription: string;
  content: string;
}


export function Dashboard() {

  const posts = [
    {
      id: '1',
      imageURL: 'https://futurelearning.nl/wp-content/uploads/2018/08/release-notes.png',
      title: 'Product Tech Days | Your feedback',
      category: 'Product',
      shortDescription: 'The Product Tech Days was a great initiative by the Product team to share knowledge regarding the Modern channels with nine sessions, held over three days. The attendees had the opportunity to answer a quick survey that gave us general feedback on t…',
      content: ''
    },
    {
      id: '2',
      imageURL: 'https://maquinaderesultados.com.br/wp-content/uploads/2020/10/pressrelease.jpg',
      title: 'Product Tech Days | Your feedback',
      category: 'Product',
      shortDescription: 'The Product Tech Days was a great initiative by the Product team to share knowledge regarding the Modern channels with nine sessions, held over three days. The attendees had the opportunity to answer a quick survey that gave us general feedback on t…',
      content: ''
    },
    {
      id: '3',
      imageURL: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSatibOaSF7dU89QTCw1jKXB2ySY5pxZqPn2fCkYB9csybbbanTxMIwvUzVYsgiZvLEWQs&usqp=CAU',
      title: 'Product Tech Days | Your feedback',
      category: 'Product',
      shortDescription: 'The Product Tech Days was a great initiative by the Product team to share knowledge regarding the Modern channels with nine sessions, held over three days. The attendees had the opportunity to answer a quick survey that gave us general feedback on t…',
      content: ''
    },
    {
      id: '4',
      imageURL: 'https://devtechnosys.com/insights/wp-content/uploads/2020/01/6-Steps-for-Effective-Product-Development.jpg',
      title: 'Product Tech Days | Your feedback',
      category: 'Product',
      shortDescription: 'The Product Tech Days was a great initiative by the Product team to share knowledge regarding the Modern channels with nine sessions, held over three days. The attendees had the opportunity to answer a quick survey that gave us general feedback on t…',
      content: ''
    },
    {
      id: '5',
      imageURL: 'https://miro.medium.com/max/2000/1*q8JuaobmDw3y0XUB6UhU_Q.png',
      title: 'Product Tech Days | Your feedback',
      category: 'Product',
      shortDescription: 'The Product Tech Days was a great initiative by the Product team to share knowledge regarding the Modern channels with nine sessions, held over three days. The attendees had the opportunity to answer a quick survey that gave us general feedback on t…',
      content: ''
    },
    {
      id: '6',
      imageURL: 'https://skimgroup.com/app/uploads/2020/01/woman-vs-machine-blog-header-image-2-1200x630-c-center.png',
      title: 'Product Tech Days | Your feedback',
      category: 'Product',
      shortDescription: 'The Product Tech Days was a great initiative by the Product team to share knowledge regarding the Modern channels with nine sessions, held over three days. The attendees had the opportunity to answer a quick survey that gave us general feedback on t…',
      content: ''
    },
    {
      id: '7',
      imageURL: 'https://pmlife.ru/wp-content/uploads/2019/06/release_notes.png',
      title: 'Product Tech Days | Your feedback',
      category: 'Product',
      shortDescription: 'The Product Tech Days was a great initiative by the Product team to share knowledge regarding the Modern channels with nine sessions, held over three days. The attendees had the opportunity to answer a quick survey that gave us general feedback on t…',
      content: ''
    },
    {
      id: '8',
      imageURL: 'https://img2.pngio.com/do-you-need-a-product-manager-product-manager-png-1380_500.png',
      title: 'Product Tech Days | Your feedback',
      category: 'Product',
      shortDescription: 'The Product Tech Days was a great initiative by the Product team to share knowledge regarding the Modern channels with nine sessions, held over three days. The attendees had the opportunity to answer a quick survey that gave us general feedback on t…',
      content: ''
    }
  ];

  return (
    <Container>
      <Grid container>
        <Grid item>
          <Content>
          <Box paddingTop={2} style={{ display: "flex", flexFlow: 'row wrap', flex: 1, justifyContent: "flex-start", alignItems: "flex-start", gap: '20px', height:'100%', width:'100%'}}>
            {posts.map(post=> {
              return (
                <Card id={post.id} style={{height: '415px', width:"370px"}}>
                <CardMedia component={()=><img height='180px' width="374px" src={post.imageURL} alt={post.title}></img>}/>
                <CardContent>
                  <Grid container spacing={1}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2" color="secondary">
                        {post.category}                      
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography gutterBottom variant="subtitle1" component="div">
                        {post.title} 
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="body2" >
                        {post.shortDescription}                    
                      </Typography>
                    </Grid>
                    <Grid item xs={12} style={{ display: "flex", justifyContent: "flex-end", alignItems: "flex-end"}}>
                      <IconButton size="small" onClick={()=>console.log("clicked")}>
                        <FiUpload />
                      </IconButton>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
              )
            })}
          </Box>
          </Content>
        </Grid>
      </Grid>
    </Container>
  )
}