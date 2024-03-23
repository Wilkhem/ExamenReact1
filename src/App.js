import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ExamenReact1 = () => {
  const [notas, setNotas] = useState([
    { nota: '', notaMaxima: 30 },
    { nota: '', notaMaxima: 30 },
    { nota: '', notaMaxima: 40 }
  ]);
  const [mensaje, setMensaje] = useState('');
  const [mostrarAlerta, setMostrarAlerta] = useState(false);

  const calcularNotaFinal = () => {
    const totalNotas = notas.reduce((total, { nota }) => total + parseInt(nota), 0);
    const totalNotasMaximas = notas.reduce((total, { notaMaxima }) => total + parseInt(notaMaxima), 0);
    const notaFinal = totalNotas / totalNotasMaximas;

    if (notaFinal >= 0 && notaFinal <= 0.59) {
      setMensaje('Reprobado');
    } else if (notaFinal >= 0.6 && notaFinal <= 0.79) {
      setMensaje('Bueno');
    } else if (notaFinal >= 0.8 && notaFinal <= 0.89) {
      setMensaje('Muy Bueno');
    } else if (notaFinal >= 0.9 && notaFinal <= 1) {
      setMensaje('Sobresaliente');
    } else {
      setMensaje('Error en el cálculo de la nota final');
    }
  };

  const validarFormulario = () => {
    const hayNotaFaltante = notas.some(({ nota }) => nota === '');
    const hayNotaMaximaFaltante = notas.some(({ notaMaxima }) => notaMaxima === '');
    
    if (hayNotaFaltante || hayNotaMaximaFaltante) {
      setMostrarAlerta(true);
      return false;
    }

    const notasInvalidas = notas.some(({ nota, notaMaxima }) => parseInt(nota) > parseInt(notaMaxima) || parseInt(nota) < 0);
    if (notasInvalidas) {
      alert('Por favor, ingrese notas válidas');
      return false;
    }

    return true;
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Calculadora de Notas</h1>
      <div className="row justify-content-center">
        <div className="col-md-8">
          {notas.map(({ nota, notaMaxima }, index) => (
            <div key={index} className="mb-4">
              <label className="fw-bold">Parcial {index + 1}:</label>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control"
                  placeholder={`Ingrese la nota del parcial ${index + 1}`}
                  value={nota}
                  onChange={(e) => {
                    const newNotas = [...notas];
                    newNotas[index].nota = e.target.value;
                    setNotas(newNotas);
                  }}
                />
                <span className="input-group-text">/ {notaMaxima}</span>
              </div>
            </div>
          ))}
          <button type="button" className="btn btn-primary btn-lg btn-block" onClick={() => {
            if (validarFormulario()) {
              calcularNotaFinal();
            }
          }}>Calcular Nota Final</button>
          {mensaje && (
            <div className="alert alert-info mt-4" role="alert">
              <strong>Resultado:</strong> {mensaje}
            </div>
          )}
          {mostrarAlerta && (
            <div className="alert alert-danger mt-4" role="alert">
              Por favor, complete todas las notas y notas máximas.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ExamenReact1;