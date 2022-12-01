import Head from 'next/head'
import {Container, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import NavBar from '../components/NavBar'
import Form from '../components/Form';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Dynamic Form</title>
        <meta name="description" content="Dynamic Form" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <NavBar />
        <Container maxWidth="md" style={{marginTop:"6rem"}}>
          <div>
            <Box style={{display:"flex",alignItems:"center", marginBottom:"16px", justifyContent:"space-between"}}>
              <Typography variant="h5" paragraph>
                  Dynamic Form
              </Typography>
            </Box>
            <Form />
          </div>
        </Container>
      </main>
    </div>
  )
}
