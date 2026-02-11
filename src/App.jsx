import React, { useState } from 'react';
import Sidebar from "./components/Sidebar/Sidebar";
import SobreMim from "./components/SobreMim/SobreMim.jsx";
import Carreira from "./components/Carreira/Carreira.jsx";
import Projetos from './components/Projetos/Projetos.jsx';
import FAQ from "./components/FAQ/FAQ.jsx";
import Contato from './components/Contato/Contato.jsx';
import './styles/global.css';

export default function App() {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

  return (
    <>
      <Sidebar onExpandedChange={setSidebarExpanded} />
      <main className={`main-content ${sidebarExpanded ? 'sidebar-expanded' : ''}`}>
          <SobreMim />
          <Projetos />
          <Carreira />
          <FAQ />
          <Contato />
      </main>
    </>
  );
}
