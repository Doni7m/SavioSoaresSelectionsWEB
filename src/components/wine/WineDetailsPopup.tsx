import React, { useEffect } from 'react';
import { X, Printer } from 'lucide-react'; // Adicionado o ícone de uva
import { Wine } from '../../types';
import { Button } from '../ui/Button';
import { getCloudinaryUrl } from '../../lib/cloudinary';


interface WineDetailsPopupProps {
  wine: Wine;
  onClose: () => void;
}
const WineDetailsPopup: React.FC<WineDetailsPopupProps> = ({ wine, onClose }) => {
  const cloudinaryImageUrl = getCloudinaryUrl(wine.image);

  useEffect(() => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      onClose();
    }
  };

  window.addEventListener('keydown', handleKeyDown);
  
  return () => {
    window.removeEventListener('keydown', handleKeyDown);
  };
}, [onClose]);

  const handlePrint = () => {
  // 1) Abre a nova janela em branco
  const printWindow = window.open('', '_blank');
  if (!printWindow) return; {
      const printImageUrl = getCloudinaryUrl(wine.image);
      window.onload = () => {
        const images = document.images;
        let loaded = 0;
        const total = images.length;

        const checkLoaded = () => {
          loaded++;
          if (loaded === total) window.print();
        };

        for (let img of images) {
          if (img.complete) {
            checkLoaded();
          } else {
            img.onload = checkLoaded;
            img.onerror = checkLoaded;
          }
        }

        // fallback de 2 segundos caso imagem demore muito
        setTimeout(() => window.print(), 2000);
      };
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>${wine.name} - Technical Sheet</title>
            <style>
            <style>
          /* 1) Define o tamanho da página e margens */
          @page {
            size: A4 portrait;      /* ou "letter portrait", se for carta */
            margin: 15mm 10mm;      /* ajuste conforme quiser */
          }

          /* 2) Reset básico */
          html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
          }

          /* 3) Escalonar o body para garantir que tudo caiba */
          /*    Ajuste o valor de scale(0.95) conforme a quantidade de conteúdo */
          @media print {
            body {
              transform: scale(0.95);
              transform-origin: top left;
              /* fallback para navegadores que entendem zoom */
              zoom: 0.85;
            }
            /* 4) Evita quebras de grid e seções no meio da página */
            .header, .main-content, .tech-grid, .footer {
              page-break-inside: avoid;
            }
          }
              @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Work+Sans:wght@400;500&display=swap');
              body {
                font-family: 'Work Sans', sans-serif;
                padding: 40px;
                max-width: 1200px;
                margin: 0 auto;
                color: #333;
              }
              .header, .footer {
                margin-top: 20px;
                text-align: center;
                margin-bottom: 40px;
                border-bottom: 2px solid #591C21;
                padding-bottom: 20px;
              }
              .footer {
                border-top: 2px solid #591C21;
                margin-top: 30px;
                padding-top: 2px;
                font-size: 12px;
              }
              html, body {
                height: 100%;
                margin: 0;
              }

              .wrapper {
                min-height: 100%;
                display: flex;
                flex-direction: column;
              }

              .main-content {
                flex: 1;
              }

              .footer {
                /* já pode manter seus estilos atuais */
                margin-top: auto;
              }
              .company-name {
                font-family: 'Cormorant Garamond', serif;
                font-size: 65px;
                color: #591C21;
                display: flex;
                justify-content: center;
                align-items: center;
                gap: 10px;
              }
              .main-content {
                display: grid;
                grid-template-columns: 300px 1fr;
                gap: 40px;
                margin-bottom: 40px;
              }
              .wine-image {
                width: 200px;
                height: auto;
                max-height: 500px;
                object-fit: contain;
                display: block;
                break-inside: avoid;
              }
              h1 {
                font-family: 'Cormorant Garamond', serif;
                color: #591C21;
                font-size: 28px;
                margin-bottom: 5px;
              }
              h2 {
                font-family: 'Cormorant Garamond', serif;
                color: #591C21;
                font-size: 22px;
                margin: 5px 0 10px;
              }
              .tech-grid {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 10px;
              }
                .footer-line {
                font-family: 'Work Sans', sans-serif;
                color: #000;
                font-size: 12px;
                text-align: center;
              }
              .footer-line p {
                margin: 0;
                font-size: 10px;
              }
              .tech-item {
                border-bottom: 1px solid #eee;
                padding-bottom: 8px;
              }
              .tech-label {
                font-weight: 500;
                color: #666;
                font-size: 14px;
                margin-bottom: 4px;
              }
              .tech-value {
                font-size: 15px;
              }
              @media print {
                body { padding: 20px; }
                .main-content {
                  grid-template-columns: 200px 1fr;
                  gap: 20px;
                }
               @page {
                    margin: 0;
                    size: auto;
                  }
              }
            </style>
          </head>
          <body>
            <div class="wrapper">
            <div class="header">
              <div class="company-name">
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#aa9f27" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-grape-icon lucide-grape"><path d="M22 5V2l-5.89 5.89"/><circle cx="16.6" cy="15.89" r="3"/><circle cx="8.11" cy="7.4" r="3"/><circle cx="12.35" cy="11.65" r="3"/><circle cx="13.91" cy="5.85" r="3"/><circle cx="18.15" cy="10.09" r="3"/><circle cx="6.56" cy="13.2" r="3"/><circle cx="10.8" cy="17.44" r="3"/><circle cx="5" cy="19" r="3"/></svg>
                Savio Soares Selections
              </div>
              <p>Expressive Wine fron Small Growes</p>
            </div>
            <div class="main-content">
              <div><img src="${printImageUrl}" alt="${wine.name}" class="wine-image"></div>
              <div>
                <h1>${wine.name}</h1>
                <h2>Description</h2>
                <p>${wine.description}</p>
              </div>
            </div>
            <h2>Technical Information</h2>
            <div class="tech-grid">
              ${Object.entries(wine.technical).map(([key, value]) => `
                <div class="tech-item">
                  <div class="tech-label">${key.replace(/([A-Z])/g, ' $1').trim()}</div>
                  <div class="tech-value">${(value || 'N/A').replace(/\n/g, '<br>')}</div>
                </div>
              `).join('')}
            </div>
            <div class="footer">
              <div class="company-name">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#aa9f27" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-grape-icon lucide-grape"><path d="M22 5V2l-5.89 5.89"/><circle cx="16.6" cy="15.89" r="3"/><circle cx="8.11" cy="7.4" r="3"/><circle cx="12.35" cy="11.65" r="3"/><circle cx="13.91" cy="5.85" r="3"/><circle cx="18.15" cy="10.09" r="3"/><circle cx="6.56" cy="13.2" r="3"/><circle cx="10.8" cy="17.44" r="3"/><circle cx="5" cy="19" r="3"/></svg>
                <div class="footer-line">
                  Savio Soares Selections <p>1140 Broadway STE 207 - New York, NY 10001</p>
                </div>
              </div>
              
            </div>
            <!-- 4) SCRIPT PARA IMPRIMIR E FECHAR -->
        <script>
          // dispara o diálogo assim que todo HTML/CSS carregar
          window.onload = () => {
            window.print();
          };
          // fecha automaticamente quando a impressão terminar (ou for cancelada)
          window.onafterprint = () => {
            window.close();
          };
          // fallback para navegadores que não suportam onafterprint
          setTimeout(() => {
            window.close();
          }, 500);
        </script>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    // O modal de detalhes do vinho, com botão de fechar e botão de imprimir
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-neutral-800 max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-lg shadow-xl">
        <div className="relative">
          <button
            onClick={onClose}
            className="top-6 right-6 z-50 bg-white dark:bg-neutral-800 p-2 rounded-full shadow-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            aria-label="Close"
          >
            
            <X size={24} />
          </button>
          <div className="grid md:grid-cols-2 gap-6 p-6">
            <div className="relative w-full max-w-xs mx-auto">
              <img
                src={cloudinaryImageUrl}
                 alt={wine.name}
                   className="w-[400px] h-[600px] object-contain mx-auto"
                      />
            </div>
            <div>
              <h2 className="font-serif text-2xl font-semibold mb-2 dark:text-white">{wine.name}</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{wine.producer}</p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium text-lg mb-2 dark:text-white">Wine Details</h3>
                  <dl className="space-y-2 text-sm">
                    <div>
                      <dt className="text-gray-600 dark:text-gray-400">Vintage</dt>
                      <dd className="font-medium dark:text-white">{wine.vintage}</dd>
                    </div>  
                  </dl>
                </div>
                <div>
                  <h3 className="font-medium text-lg mb-2 dark:text-white">Description</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm" style={{ whiteSpace: "pre-line" }}
                  >{wine.description}</p>
                </div>
                {wine.technical && (
                  <div>
                    <h3 className="font-medium text-lg mb-2 dark:text-white">Technical Information</h3>
                    <div className="grid grid-cols-1 gap-2">
                      {Object.entries(wine.technical).map(([key, value]) => (
                        <div key={key} className="border-b border-gray-200 dark:border-gray-700 pb-2" style={{ whiteSpace: "pre-line" }}>
                          <dt className="text-gray-600 dark:text-gray-400 text-xs" style={{ whiteSpace: "pre-line" }}>
                            {key.replace(/([A-Z])/g, ' $1').trim()}
                          </dt>
                          <dd className="font-medium dark:text-white text-sm" style={{ whiteSpace: "pre-line" }}>
                            {value || 'N/A'}
                          </dd>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <Button
                  variant="secondary"
                  className="w-full mt-6"
                  onClick={handlePrint}
                >
                  <Printer className="w-4 h-4 mr-2" />
                  Print Technical Sheet
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WineDetailsPopup;