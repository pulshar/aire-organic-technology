import { Product, JournalEntry } from './types';

export const MOCK_PRODUCTS: Product[] = [
    {
        id: 'p1',
        name: 'Purificador Silente',
        slug: 'purificador-silente',
        price: 450,
        category: 'Aire',
        description: 'Filtración HEPA verdadera con sistema de flujo laminar. Elimina el 99.97% de las partículas sin perturbar el silencio de tu hogar.',
        poeticDescription: 'Respira la calma de un bosque antiguo. Aire puro, sin sonido, fluyendo como una brisa invisible.',
        image: 'https://images.unsplash.com/photo-1631679706909-1844bbd07221?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: 'p2',
        name: 'Altavoz de Cerámica',
        slug: 'altavoz-de-ceramica',
        price: 320,
        category: 'Sonido',
        description: 'Driver de rango completo alojado en una carcasa de cerámica hecha a mano. Conectividad Bluetooth 5.0 y 12 horas de autonomía.',
        poeticDescription: 'Música que fluye como agua. Resonancia natural en arcilla horneada, uniendo lo digital con lo terrenal.',
        image: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: 'p3',
        name: 'Lámpara de Alabastro',
        slug: 'lampara-de-alabastro',
        price: 180,
        category: 'Luz',
        description: 'LED cálido de 2700K integrado en piedra de alabastro natural. Control táctil de intensidad para adaptarse a tu ritmo circadiano.',
        poeticDescription: 'Un fragmento de luna capturado en piedra. Ilumina sin deslumbrar, suavizando los bordes de la realidad.',
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: 'p4',
        name: 'Base de Roble',
        slug: 'base-de-roble',
        price: 135,
        category: 'Energía',
        description: 'Base de carga inalámbrica Qi tallada en un solo bloque de roble europeo sostenible. Superficie tratada con aceites naturales para un tacto orgánico.',
        poeticDescription: 'Tecnología que echa raíces. La energía fluye a través de los anillos del tiempo, conectando tus dispositivos con el bosque.',
        image: 'https://images.unsplash.com/photo-1595341888016-a392ef81b7de?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: 'p5',
        name: 'Difusor Nebulosa',
        slug: 'difusor-nebulosa',
        price: 95,
        category: 'Aire',
        description: 'Tecnología ultrasónica que dispersa aceites esenciales sin calor. Acabado en hormigón pulido y funcionamiento ultra silencioso.',
        poeticDescription: 'Niebla matutina bajo demanda. Transforma la atmósfera invisible de tu habitación en un paisaje olfativo.',
        image: 'https://images.unsplash.com/photo-1602928321679-560bb453f190?q=80&w=1000&auto=format&fit=crop'
    },
    {
        id: 'p6',
        name: 'Reloj de Tinta',
        slug: 'reloj-de-tinta',
        price: 210,
        category: 'Tiempo',
        description: 'Pantalla de tinta electrónica de alto contraste en marco de roble. Muestra el tiempo con la calma del papel, sin luz azul.',
        poeticDescription: 'El tiempo detenido en papel digital. Sin parpadeos, sin urgencia. Solo el presente, enmarcado en madera.',
        image: 'https://images.unsplash.com/photo-1585128792020-803d29415281?q=80&w=1000&auto=format&fit=crop'
    }
];

export const MOCK_JOURNAL: JournalEntry[] = [
    {
        id: '1',
        title: 'La Estética de la Ausencia',
        slug: 'la-estetica-de-la-ausencia',
        excerpt: 'Cuando eliminamos lo innecesario, lo que queda canta.',
        date: 'Otoño 2024',
        image: 'https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=800&auto=format&fit=crop',
        content: [
            "El espacio vacío no es la nada. En la tradición japonesa, el 'Ma' (間) define el intervalo, la pausa que da sentido al sonido, el blanco que permite a la tinta respirar. En Aire, abrazamos esta ausencia como un material de construcción tan vital como el aluminio o la piedra.",
            "Vivimos en una cacofonía visual. Notificaciones, luces parpadeantes, superficies reflectantes que compiten por nuestra atención cognitiva. ¿Qué sucede cuando diseñamos tecnología que se niega a competir? ¿Qué pasa cuando el objeto se retira?",
            "La estética de la ausencia no es minimalismo por moda. Es una postura ética. Creemos que tus herramientas deben ser invisibles hasta que las necesitas. Al eliminar adornos, logos y luces innecesarias, permitimos que el objeto envejezca con dignidad, convirtiéndose en una parte silenciosa de tu ritual diario.",
            "La verdadera belleza reside en lo que decidimos no añadir."
        ]
    },
    {
        id: '2',
        title: 'Piedra y Silicio',
        slug: 'piedra-y-silicio',
        excerpt: 'Una conversación entre lo ancestral y lo eterno.',
        date: 'Invierno 2024',
        image: 'https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=800&auto=format&fit=crop',
        content: [
            "Hay una tensión inherente en nuestra era. Nuestras mentes vuelan a la velocidad de la fibra óptica, pero nuestros cuerpos anhelan el peso de una piedra de río, la textura rugosa del lino, el calor de la madera.",
            "Tocamos vidrio frío miles de veces al día. Superficies inertes, perfectas, repelentes. Por eso, en Aire, buscamos la imperfección táctil. ¿Por qué un cargador no puede sentirse como un travertino romano? ¿Por qué un altavoz no puede resonar como una vasija de arcilla?",
            "Al fusionar el silicio —el cerebro de nuestra era— con materiales geológicos, creamos objetos que anclan. La tecnología orgánica no es solo una estética visual; es una rehumanización de la interfaz.",
            "Cuando sostienes un objeto de Aire, estás sosteniendo millones de años de geología y décadas de ingeniería. Es un apretón de manos entre el pasado profundo y el futuro inmediato."
        ]
    },
    {
        id: '3',
        title: 'El Ritual del Inicio',
        slug: 'el-ritual-del-inicio',
        excerpt: 'La tecnología como facilitadora de la ceremonia matutina.',
        date: 'Primavera 2025',
        image: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=800&auto=format&fit=crop',
        content: [
            "La mañana es sagrada. Es el umbral entre el sueño y la acción. Demasiado a menudo, rompemos este momento con pantallas brillantes y alertas urgentes. ¿Y si la tecnología pudiera respetar este umbral?",
            "Diseñamos objetos que esperan. Una cafetera que despierta contigo, no antes que tú. Una luz que imita el amanecer gradualmente, no un interruptor binario. Creemos en la tecnología que acompaña el ritual, no que lo secuestra.",
            "Tus primeros minutos del día definen tu estado mental. Aire busca proteger esa serenidad, ofreciendo herramientas que funcionan con la suavidad de un susurro."
        ]
    },
    {
        id: '4',
        title: 'Luz Líquida',
        slug: 'luz-liquida',
        excerpt: 'Iluminación que respira con el ritmo de tu cuerpo.',
        date: 'Verano 2025',
        image: 'https://images.unsplash.com/photo-1596464716127-f2a82984de30?q=80&w=800&auto=format&fit=crop',
        content: [
            "La luz no es estática; es un fluido vivo. Cambia de temperatura, intensidad y dirección a lo largo del día. Sin embargo, nuestras casas suelen estar estancadas en un perpetuo mediodía artificial.",
            "Nuestros estudios sobre iluminación circadiana buscan devolver el flujo natural a tus espacios interiores. Luz ámbar profunda para la noche, blancos nítidos para la concentración matutina.",
            "Imagina una luz que se siente menos como una bombilla y más como una ventana abierta. Eso es Luz Líquida."
        ]
    },
    {
        id: '5',
        title: 'Texturas del Tiempo',
        slug: 'texturas-del-tiempo',
        excerpt: 'Por qué permitimos que nuestros objetos envejezcan.',
        date: 'Otoño 2025',
        image: 'https://images.unsplash.com/photo-1506619216599-9d16d0903dfd?q=80&w=800&auto=format&fit=crop',
        content: [
            "El plástico amarillea y se agrieta. La madera adquiere pátina. El cuero se suaviza. El cobre se oxida creando capas protectoras de belleza incalculable.",
            "En Aire, seleccionamos materiales que aceptan el paso del tiempo como un regalo, no como un defecto. Queremos que tu altavoz cuente una historia dentro de diez años. Queremos que tu base de carga recuerde tus manos.",
            "La perfección de fábrica es aburrida. La belleza real emerge del uso, del roce, de la vida compartida con el objeto."
        ]
    }
];
