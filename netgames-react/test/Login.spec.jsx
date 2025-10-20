import { vi } from 'vitest';
vi.mock('../src/styles/estilo.css', () => ({ default: {} }));

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import Login from '../src/pages/Login'; 

const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async (importActual) => {
  const actual = await importActual();
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

window.alert = vi.fn();

describe('Componente Login', () => {

  beforeEach(() => {
    mockedNavigate.mockClear();
    window.alert.mockClear();
    localStorage.clear();
  });

  it('renderiza todos los elementos del formulario correctamente', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    expect(screen.getByRole('heading', { name: /Iniciar Sesión/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/Usuario o Correo/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Contraseña/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Iniciar Sesión/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Regístrate aquí/i })).toBeInTheDocument();
  });

  it('muestra una alerta si los campos están vacíos', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const boton = screen.getByRole('button', { name: /Iniciar Sesión/i });
    
    fireEvent.submit(boton); 

    expect(window.alert).toHaveBeenCalledWith('Por favor, completa todos los campos.');
  });
  
  it('muestra una alerta si las credenciales son incorrectas', () => {
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const inputUsuario = screen.getByLabelText(/Usuario o Correo/i);
    const inputPassword = screen.getByLabelText(/Contraseña/i);
    const boton = screen.getByRole('button', { name: /Iniciar Sesión/i });

    fireEvent.change(inputUsuario, { target: { value: 'usuario_falso' } });
    fireEvent.change(inputPassword, { target: { value: '123' } });

    fireEvent.submit(boton);

    expect(window.alert).toHaveBeenCalledWith('Usuario o contraseña incorrectos');
  });

  it('inicia sesión y redirige al perfil con credenciales correctas', () => {
    const usuarios = [{ nombreUsuario: 'testuser', correo: 'test@test.com', password: 'password123' }];
    localStorage.setItem('usuarios', JSON.stringify(usuarios));
    
    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>
    );
    const inputUsuario = screen.getByLabelText(/Usuario o Correo/i);
    const inputPassword = screen.getByLabelText(/Contraseña/i);
    const boton = screen.getByRole('button', { name: /Iniciar Sesión/i });

    fireEvent.change(inputUsuario, { target: { value: 'testuser' } });
    fireEvent.change(inputPassword, { target: { value: 'password123' } });

    fireEvent.submit(boton);

    expect(window.alert).toHaveBeenCalledWith('Inicio de sesión exitoso');
    expect(mockedNavigate).toHaveBeenCalledWith('/perfil');
    expect(localStorage.getItem('sesionIniciada')).toBe('true');
  });
});