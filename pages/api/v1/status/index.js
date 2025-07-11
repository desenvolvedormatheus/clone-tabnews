function status(request, response) {
  response.status(200).json(
    { chave: "Curso.dev muito bãun" }
  )
}

export default status;