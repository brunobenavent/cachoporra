import { Schema, model } from 'mongoose';

const PorraSchema = Schema({
    jornadaActual: {
        type: Schema.Types.ObjectId,
        ref: 'Jornada'
      },
    jornadas: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Jornada'
      }
    ],
    participantes: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
      }
    ],
    estado: {
      type: String,
      enum: ['activa', 'determinada'],
      default: 'activa'
    },
    ganadores: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
      }
    ],
    bote: {
      type: Number,
      default: 0
    }
  });


export default model('Porra', PorraSchema)