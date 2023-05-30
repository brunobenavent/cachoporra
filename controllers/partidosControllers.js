import axios from "axios";

const resultadosControllers = async (req, res) => {
  try {
    const response = await axios.get("http://localhost:8080/api/resultados/37");
    const partidos = response.data.partidos;

    res.render("partidos", {
      pagina: "Resultados de fútbol de la jornada actual",
      partidos
    });
  } catch (error) {
    console.error(error);
    res.render("error", {
      mensaje: "Error al obtener los resultados de la jornada actual",
    });
  }
};

export { resultadosControllers };