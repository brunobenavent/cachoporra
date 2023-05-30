import { Schema, model } from 'mongoose';

const JornadaSchema = Schema({
    inicio: {
      type: Date,
      required: true
    },
    fin: {
      type: Date,
      required: true
    },
    partidos: [
      {
        local: {
          type: String,
          required: true
        },
        visitante: {
          type: String,
          required: true
        },
        resultadoExacto: {
          type: String,
          required: false
        }
      }
    ],
    recaudación:  {
        type: Number,
        default: 0
      }
  });


export default model('Jornada', JornadaSchema)