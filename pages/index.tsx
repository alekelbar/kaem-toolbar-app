import { Button } from '@mui/material'
import { NextPage } from 'next'
import Head from 'next/head'
import { Layout } from '../src/components'
import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  return (
    <Layout>
      <Button>Hello World!</Button>
    </Layout>
  )
}

export default Home
