import { Schema, model } from 'mongoose';

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El email es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña es obligatoria'],
    },
    img: {
        type: String,
    },
    // rol: {
    //     type: String,
    //     // required: true,
    //     emun: ['ADMIN_ROLE', 'USER_ROLE']
    // },
    token: {
        type: String
    },
    confirmado: {
        type: Boolean,
        default: false
    },
    estado: {
        type: Boolean,
        default: true
    },
    credito: {
        type: Number,
        default: 0
    },
    porrasParticipadas: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Porra'
        }
    ],
    porrasGanadas: [
        {
        type: Schema.Types.ObjectId,
        ref: 'Porra'
        }
    ]
    // google: {
    //     type: Boolean,
    //     default: false
    // }
});


UsuarioSchema.methods.toJSON = function(){
    const {__v, password, _id, token, ...usuario} = this.toObject();
    usuario.uid = _id

    return usuario
}
export default model('Usuario', UsuarioSchema)