function Home() {

  const titulo = <h1>Tafnes, eu amo você. Se vc me ama dá uma risadinha!</h1>

  const div = (
    <div
      style={{ backgroundColor: 'black', color: 'white', width: "100%", height: "100vh" }}
    >{titulo}</div>
  )

  return div;
}

export default Home;
