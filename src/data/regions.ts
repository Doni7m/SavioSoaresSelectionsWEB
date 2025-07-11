import { Region } from '../types';

// Lista de regiões vínicas associadas aos países
export const regions: Region[] = [
  // França
  { id: 'champagne', countryId: 'france', countryName: 'França', name: 'CHAMPAGNE', description: '', image: 'https://res.cloudinary.com/dglghqker/image/upload/v1746545273/ETIENNE_UVA_z6swlh.jpg', producerCount: 1 },
  { id: 'bourgogne', countryId: 'france', countryName: 'França', name: 'BURGUNDY', description: '', image: 'https://res.cloudinary.com/dglghqker/image/upload/v1746545362/mont_milieu-1_heecja.jpg', producerCount: 3 },
  { id: 'beaujolais', countryId: 'france', countryName: 'França', name: 'BEAUJOLAIS', description: '', image: 'https://res.cloudinary.com/dglghqker/image/upload/v1746545414/Vineyards_-_La_Cuvee_du_Chat_jnfuna.jpg', producerCount: 5 },
  { id: 'jura', countryId: 'france', countryName: 'França', name: 'JURA', description: '', image: 'https://res.cloudinary.com/dglghqker/image/upload/v1746545457/GODIN-RICHARD_144_gqs4da.jpg', producerCount: 1 },
  { id: 'bugey', countryId: 'france', countryName: 'França', name: 'BUGEY', description: '', image: 'https://res.cloudinary.com/dglghqker/image/upload/v1746545508/021_clnuhy.jpg', producerCount: 1 },
  { id: 'loire', countryId: 'france', countryName: 'França', name: 'LOIRE', description: '', image: 'https://res.cloudinary.com/dglghqker/image/upload/v1746545534/IMG_0045_fqgrr1.jpg', producerCount: 7 },
  { id: 'cotes-de-provence', countryId: 'france', countryName: 'França', name: 'CÔTE DE PROVENCE', description: '', image: 'https://res.cloudinary.com/dglghqker/image/upload/v1746545571/Le-Loup-Bleu-011-1800x900_bkzov6.jpg', producerCount: 1 },
  { id: 'rhone', countryId: 'france', countryName: 'França', name: 'RHÔNE', description: '', image: 'https://res.cloudinary.com/dglghqker/image/upload/v1746545613/C._Bonfils_Old_Grenache_vines_tspabm.jpg', producerCount: 3 },
  { id: 'languedoc-roussillon', countryId: 'france', countryName: 'França', name: 'LANGUEDOC-ROUSSILLON', description: '', image: 'https://res.cloudinary.com/dglghqker/image/upload/v1746545653/Agalis_Carignan_vines_k2dcgy.jpg', producerCount: 1 },
  { id: 'southwest', countryId: 'france', countryName: 'França', name: 'SOUTHWEST', description: '', image: 'https://res.cloudinary.com/dglghqker/image/upload/v1746545703/_D8N4191_copie_nyprjr.jpg', producerCount: 1 },

  // Itália
  { id: 'veneto', countryId: 'italy', countryName: 'Itália', name: 'Veneto', description: '', image: 'https://res.cloudinary.com/dglghqker/image/upload/v1747945670/prosecco-veneto-wine-region-italy_kfhzki.jpg', producerCount: 0 },
  { id: 'lombardia', countryId: 'italy', countryName: 'Itália', name: 'Lombardia', description: '', image: 'https://res.cloudinary.com/dglghqker/image/upload/v1747945741/T1BuVOcCFeqz.jpg_tagcti.jpg', producerCount: 0 },
  { id: 'piemonte', countryId: 'italy', countryName: 'Itália', name: 'Piemonte', description: '', image: 'https://res.cloudinary.com/dglghqker/image/upload/v1747945810/images_k68ndw.jpg', producerCount: 0 },
  { id: 'emilia-romagna', countryId: 'italy', countryName: 'Itália', name: 'Emilia-Romagna', description: '', image: '', producerCount: 0 },
  { id: 'sicilia', countryId: 'italy', countryName: 'Itália', name: 'Sicilia', description: '', image: '', producerCount: 0 },

  // Alemanha
  { id: 'rheingau', countryId: 'germany', countryName: 'Alemanha', name: 'Rheingau', description: '', image: 'https://res.cloudinary.com/dglghqker/image/upload/v1747940576/6571_kcmcma.jpg', producerCount: 1 },
  { id: 'rheinhessen', countryId: 'germany', countryName: 'Alemanha', name: 'Rheinhessen', description: '', image: 'https://res.cloudinary.com/dglghqker/image/upload/v1747940623/katharinenkirche_in_oppenheim_typical_german_church_in_the_vineyard_smx2tu.jpg', producerCount: 1 },
  { id: 'pfalz', countryId: 'germany', countryName: 'Alemanha', name: 'Pfalz', description: '', image: 'https://res.cloudinary.com/dglghqker/image/upload/v1747940765/pfalz-393-1-3_shq2me.jpg', producerCount: 1 },

  // Áustria
  { id: 'kamptal', countryId: 'austria', countryName: 'Áustria', name: 'Kamptal', description: '', image: '', producerCount: 0 },
  { id: 'wagram', countryId: 'austria', countryName: 'Áustria', name: 'Wagram', description: '', image: '', producerCount: 0 },
  { id: 'burgenland', countryId: 'austria', countryName: 'Áustria', name: 'Burgenland', description: '', image: '', producerCount: 0 },

  // Espanha
  { id: 'catalunya', countryId: 'spain', countryName: 'Espanha', name: 'Catalunya', description: '', image: '', producerCount: 0 },

  // Portugal
  { id: 'vinho-verde', countryId: 'portugal', countryName: 'Portugal', name: 'Vinho Verde', description: '', image: '', producerCount: 0 },
  { id: 'dao', countryId: 'portugal', countryName: 'Portugal', name: 'Dão', description: '', image: '', producerCount: 0 },
  { id: 'tras-os-montes', countryId: 'portugal', countryName: 'Portugal', name: 'Trás-os-Montes', description: '', image: '', producerCount: 0 },
  { id: 'douro', countryId: 'portugal', countryName: 'Portugal', name: 'Douro', description: '', image: '', producerCount: 0 },
  { id: 'bairrada', countryId: 'portugal', countryName: 'Portugal', name: 'Bairrada', description: '', image: '', producerCount: 0 },
  { id: 'alentejo', countryId: 'portugal', countryName: 'Portugal', name: 'Alentejo', description: '', image: '', producerCount: 0 },

  // Estados Unidos
  { id: 'russian-river-valley', countryId: 'usa', countryName: 'Estados Unidos', name: 'Russian River Valley (Califórnia)', description: '', image: '', producerCount: 0 }
];

// Função que retorna as regiões de um país, dado o ID do país
import { countries } from './countries';

export const getRegionsByCountry = (countryId: string) => {
  const country = countries.find(c => c.id === countryId); // busca o país
  const countryRegions = regions.filter(r => r.countryId === countryId); // busca as regiões associadas
  return { country, regions: countryRegions };
};
