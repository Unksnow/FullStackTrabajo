import { vi } from 'vitest';
vi.mock('../src/styles/estilo.css', () => ({ default: {} }));

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, it, expect, beforeEach } from 'vitest';
import Profile from '../src/pages/Profile';

const mockedNavigate = vi.fn();
vi.mock('react-router-dom', async (importActual) => {
  const actual = await importActual();
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

window.alert = vi.fn();
window.confirm = vi.fn();

describe('Componente Profile', () => {

  const mockUser = 'testUser';
  const mockPurchases = [
    { producto: 'Juego A', precio: 1000, fecha: '01/01/2025' },
    { producto: 'Juego B', precio: 2000, fecha: '02/01/2025' },
  ];

  beforeEach(() => {
    mockedNavigate.mockClear();
    window.alert.mockClear();
    window.confirm.mockClear();
    localStorage.clear();
  });

  it('redirige al login y muestra alerta si no hay sesión', () => {
    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );

    expect(window.alert).toHaveBeenCalledWith('Debes iniciar sesión para ver tu perfil.');
    
    expect(mockedNavigate).toHaveBeenCalledWith('/login');
  });

  it('renderiza el perfil del usuario sin compras', () => {
    localStorage.setItem('sesionIniciada', 'true');
    localStorage.setItem('usuarioActivo', mockUser);
    localStorage.setItem('historialCompras', JSON.stringify({})); 

    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /Bienvenido, testUser/i })).toBeInTheDocument();
    
    expect(screen.getByText('Aún no has realizado compras.')).toBeInTheDocument();
  });

  it('renderiza el historial de compras correctamente', () => {
    localStorage.setItem('sesionIniciada', 'true');
    localStorage.setItem('usuarioActivo', mockUser);
    const history = { [mockUser]: mockPurchases };
    localStorage.setItem('historialCompras', JSON.stringify(history));

    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );

    expect(screen.getByText('Juego A')).toBeInTheDocument();
    expect(screen.getByText('Juego B')).toBeInTheDocument();
    expect(screen.queryByText('Aún no has realizado compras.')).not.toBeInTheDocument();
  });

  it('cierra la sesión y redirige al login', () => {
    localStorage.setItem('sesionIniciada', 'true');
    localStorage.setItem('usuarioActivo', mockUser);

    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );

    const logoutButton = screen.getByRole('button', { name: /Cerrar Sesión/i });
    fireEvent.click(logoutButton);

    expect(mockedNavigate).toHaveBeenCalledWith('/login');
    
    expect(localStorage.getItem('sesionIniciada')).toBe(null);
    expect(localStorage.getItem('usuarioActivo')).toBe(null);
  });

  it('elimina una compra del historial cuando se confirma', () => {
    localStorage.setItem('sesionIniciada', 'true');
    localStorage.setItem('usuarioActivo', mockUser);
    const history = { [mockUser]: mockPurchases };
    localStorage.setItem('historialCompras', JSON.stringify(history));

    window.confirm.mockReturnValue(true);

    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );

    const deleteButtons = screen.getAllByRole('button', { name: /Borrar/i });
    fireEvent.click(deleteButtons[0]);

    expect(window.confirm).toHaveBeenCalled();
    
    expect(screen.queryByText('Juego A')).not.toBeInTheDocument();
    
    expect(screen.getByText('Juego B')).toBeInTheDocument();
  });

  it('NO elimina una compra si se cancela', () => {
    localStorage.setItem('sesionIniciada', 'true');
    localStorage.setItem('usuarioActivo', mockUser);
    const history = { [mockUser]: mockPurchases };
    localStorage.setItem('historialCompras', JSON.stringify(history));

    window.confirm.mockReturnValue(false);

    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );

    const deleteButtons = screen.getAllByRole('button', { name: /Borrar/i });
    fireEvent.click(deleteButtons[0]); 

    expect(window.confirm).toHaveBeenCalled();
    
    expect(screen.getByText('Juego A')).toBeInTheDocument();
  });
});