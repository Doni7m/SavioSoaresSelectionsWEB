import { Country } from '../types';

// Lista de países disponíveis no sistema
export const countries: Country[] = [
  {
    id: 'france',
    name: 'FRANCE',
    description: 'França é conhecida por suas diversas regiões vinícolas renomadas e tradição na produção de vinhos de alta qualidade.',
    image: 'https://res.cloudinary.com/dglghqker/image/upload/v1746544830/Savio_Sores_Prints_PROOF-4_sed9i8.jpg', // Coloque aqui a foto representativa da França
    regionCount: 11
  },
  {
    id: 'austria',
    name: 'AUSTRIA',
    description: 'Áustria produz vinhos de alta qualidade, com destaque para vinhos brancos frescos.',
    image: 'https://res.cloudinary.com/dglghqker/image/upload/v1746544939/Pitt_Gols_Vineyards_rnaxiu.jpg', // Coloque aqui a foto representativa da Áustria
    regionCount: 3
  },
  {
    id: 'germany',
    name: 'GERMANY',
    description: 'Alemanha é reconhecida por seus vinhos brancos elegantes, especialmente Riesling.',
    image: 'https://res.cloudinary.com/dglghqker/image/upload/v1746544982/Clusserath_-_Trittenheimer_Apotheke_l2sjks.jpg', // Coloque aqui a foto representativa da Alemanha
    regionCount: 2
  },
  {
    id: 'portugal',
    name: 'PORTUGAL',
    description: 'Portugal é famoso por seus vinhos do Porto e uma rica tradição vinícola.',
    image: 'https://res.cloudinary.com/dglghqker/image/upload/v1746545031/Douro_Talk_cyxxjq.jpg', // Coloque aqui a foto representativa de Portugal
    regionCount: 5
  },
  {
    id: 'italy',
    name: 'ITALY',
    description: 'Itália é famosa por sua vasta variedade de vinhos e regiões vinícolas históricas.',
    image: 'https://res.cloudinary.com/dglghqker/image/upload/v1746545066/Busatiina_sunset_reps_nk12dc.jpg', // Coloque aqui a foto representativa da Itália
    regionCount: 4
  },
  {
    id: 'spain',
    name: 'SPAIN',
    description: 'Espanha é conhecida por seus vinhos tintos robustos e regiões vinícolas tradicionais.',
    image: 'https://res.cloudinary.com/dglghqker/image/upload/v1746545095/IMG_0208_rcdxwa.jpg', // Coloque aqui a foto representativa da Espanha
    regionCount: 1
  },
  {
    id: 'usa',
    name: 'UNITED STATES',
    description: 'Estados Unidos possui diversas regiões vinícolas, com destaque para a Califórnia.',
    image: 'https://res.cloudinary.com/dglghqker/image/upload/v1746545125/GALERIA_DO_VINHO_COURTOIS_pdpyep.jpg', // Coloque aqui a foto representativa dos Estados Unidos
    regionCount: 1
  }
];

// Função que retorna todos os países cadastrados
export const getCountries = () => countries;
