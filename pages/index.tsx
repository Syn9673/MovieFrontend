const Index = () => null

const getServerSideProps = async () => {
  return {
    redirect: {
      destination: '/browse'
    }
  }
}

export { getServerSideProps }

export default Index