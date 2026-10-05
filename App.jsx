import { useEffect } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { useStore } from './lib/store.jsx';
import { aplicarTema } from './lib/themes.js';
import { Nav } from './components/ui.jsx';
import Splash from './screens/Splash.jsx';
import Perfiles from './screens/Perfiles.jsx';
import Onboarding from './screens/Onboarding.jsx';
import EditarMeta from './screens/EditarMeta.jsx';
import Fases from './screens/Fases.jsx';
import Hoy from './screens/Hoy.jsx';
import Semana from './screens/Semana.jsx';
import EditarSemana from './screens/EditarSemana.jsx';
import Sugerencia from './screens/Sugerencia.jsx';
import Diario from './screens/Diario.jsx';
import Producto from './screens/Producto.jsx';
import Coach from './screens/Coach.jsx';
import Metas from './screens/Metas.jsx';
import Retos from './screens/Retos.jsx';
import Registrar from './screens/Registrar.jsx';
import SesionFuerza from './screens/SesionFuerza.jsx';
import Padel from './screens/Padel.jsx';
import Medidas from './screens/Medidas.jsx';
import Revision from './screens/Revision.jsx';
import Progreso from './screens/Progreso.jsx';
import Perfil from './screens/Perfil.jsx';

const CON_NAV = ['/hoy', '/diario', '/semana', '/metas', '/coach', '/retos', '/progreso'];

function Protegida({ children }) {
  const { perfil, data } = useStore();
  const loc = useLocation();
  if (!perfil) return <Navigate to="/perfiles" replace />;
  if (!perfil.listo && loc.pathname !== '/bienvenida') return <Navigate to="/bienvenida" replace />;
  if (perfil.listo && !data.meta && !['/meta', '/fases', '/bienvenida', '/perfil'].includes(loc.pathname)) return <Navigate to="/meta" replace />;
  return children;
}

export default function App() {
  const { perfil } = useStore();
  const loc = useLocation();
  useEffect(() => { aplicarTema(perfil?.tema || 'bosque'); }, [perfil?.tema]);
  useEffect(() => { window.scrollTo(0, 0); }, [loc.pathname]);
  const p = (el) => <Protegida>{el}</Protegida>;
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<Splash />} />
        <Route path="/perfiles" element={<Perfiles />} />
        <Route path="/bienvenida" element={p(<Onboarding />)} />
        <Route path="/meta" element={p(<EditarMeta />)} />
        <Route path="/fases" element={p(<Fases />)} />
        <Route path="/hoy" element={p(<Hoy />)} />
        <Route path="/semana" element={p(<Semana />)} />
        <Route path="/semana/editar" element={p(<EditarSemana />)} />
        <Route path="/semana/sugerencia" element={p(<Sugerencia />)} />
        <Route path="/diario" element={p(<Diario />)} />
        <Route path="/producto" element={p(<Producto />)} />
        <Route path="/coach" element={p(<Coach />)} />
        <Route path="/metas" element={p(<Metas />)} />
        <Route path="/retos" element={p(<Retos />)} />
        <Route path="/registrar" element={p(<Registrar />)} />
        <Route path="/fuerza" element={p(<SesionFuerza />)} />
        <Route path="/padel" element={p(<Padel />)} />
        <Route path="/medidas" element={p(<Medidas />)} />
        <Route path="/revision" element={p(<Revision />)} />
        <Route path="/progreso" element={p(<Progreso />)} />
        <Route path="/perfil" element={p(<Perfil />)} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {perfil?.listo && CON_NAV.includes(loc.pathname) && <Nav />}
    </div>
  );
}
