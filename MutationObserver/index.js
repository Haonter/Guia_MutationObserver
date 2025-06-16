/**
 * 🔍 MutationObserver - Ejemplos Educativos
 * 
 * Este archivo contiene dos ejercicios prácticos para entender
 * cómo funciona MutationObserver y sus diferentes tipos de observación.
 */

// ===================================================================
// 🎯 EJERCICIO 1: OBSERVAR CAMBIOS EN NODOS HIJOS (childList)
// ===================================================================

// Variable para contar los elementos agregados
let contadorElementos = 0;

// Función para configurar el primer observador (detecta elementos agregados/removidos)
function configurarObservadorElementos() {
    console.log('🚀 Configurando observador para elementos...');
    
    // 1. Obtener el contenedor que vamos a observar
    const contenedor = document.getElementById('contenedorObservado');
    const logEventos = document.getElementById('logEventos');
    
    // 2. Crear el MutationObserver
    // El callback recibe un array de 'mutations' (cambios detectados)
    const observer = new MutationObserver((mutations) => {
        console.log('🔄 Mutaciones detectadas:', mutations);
        
        // 3. Iterar sobre cada mutación detectada
        mutations.forEach((mutation) => {
            console.log('📝 Procesando mutación:', mutation);
            
            // 4. Verificar el tipo de mutación
            if (mutation.type === 'childList') {
                console.log('👶 Cambio en nodos hijos detectado');
                
                // 5. Procesar nodos agregados
                if (mutation.addedNodes.length > 0) {
                    mutation.addedNodes.forEach((node) => {
                        // Verificar que es un elemento HTML (no texto)
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            console.log('➕ Elemento agregado:', node);
                            agregarAlLog(logEventos, `➕ AGREGADO: ${node.tagName} con ID "${node.id}"`, 'text-green-600');
                        }
                    });
                }
                
                // 6. Procesar nodos removidos
                if (mutation.removedNodes.length > 0) {
                    mutation.removedNodes.forEach((node) => {
                        if (node.nodeType === Node.ELEMENT_NODE) {
                            console.log('➖ Elemento removido:', node);
                            agregarAlLog(logEventos, `➖ REMOVIDO: ${node.tagName} con ID "${node.id}"`, 'text-red-600');
                        }
                    });
                }
            }
        });
    });
    
    // 7. Configurar qué tipo de cambios observar
    const config = {
        childList: true,     // Observar cambios en nodos hijos (agregar/remover)
        subtree: true        // También observar cambios en descendientes
    };
    
    // 8. Iniciar la observación
    observer.observe(contenedor, config);
    console.log('✅ Observador de elementos configurado correctamente');
    
    // Mensaje inicial en el log
    agregarAlLog(logEventos, '🔍 Observador iniciado - detectando cambios en elementos...', 'text-blue-600');
}

// ===================================================================
// 🎨 EJERCICIO 2: OBSERVAR CAMBIOS EN ATRIBUTOS
// ===================================================================

// Array de colores para el ejercicio
const colores = ['bg-red-200', 'bg-green-200', 'bg-blue-200', 'bg-yellow-200', 'bg-purple-200', 'bg-pink-200'];
const tamaños = ['p-4', 'p-8', 'p-12', 'p-16'];
let colorActual = 0;
let tamañoActual = 1;

// Función para configurar el segundo observador (detecta cambios en atributos)
function configurarObservadorAtributos() {
    console.log('🚀 Configurando observador para atributos...');
    
    // 1. Obtener el elemento que vamos a observar
    const elemento = document.getElementById('elementoObservado');
    const logAtributos = document.getElementById('logAtributos');
    
    // 2. Crear el MutationObserver para atributos
    const observer = new MutationObserver((mutations) => {
        console.log('🔄 Cambios de atributos detectados:', mutations);
        
        // 3. Iterar sobre cada mutación de atributo
        mutations.forEach((mutation) => {
            console.log('📝 Procesando cambio de atributo:', mutation);
            
            // 4. Verificar que es un cambio de atributo
            if (mutation.type === 'attributes') {
                // 5. Obtener información del cambio
                const atributoModificado = mutation.attributeName;
                const valorAnterior = mutation.oldValue;
                const valorNuevo = mutation.target.getAttribute(atributoModificado);
                
                console.log(`🎨 Atributo "${atributoModificado}" cambió:`);
                console.log(`   Valor anterior: "${valorAnterior}"`);
                console.log(`   Valor nuevo: "${valorNuevo}"`);
                
                // 6. Agregar al log con formato específico según el atributo
                let mensaje = `🎨 ATRIBUTO "${atributoModificado}" modificado`;
                let colorClase = 'text-purple-600';
                
                if (atributoModificado === 'class') {
                    mensaje += ` - Nueva clase: "${valorNuevo}"`;
                    colorClase = 'text-indigo-600';
                } else if (atributoModificado === 'style') {
                    mensaje += ` - Nuevo estilo: "${valorNuevo}"`;
                    colorClase = 'text-pink-600';
                }
                
                agregarAlLog(logAtributos, mensaje, colorClase);
            }
            
            // 7. También podemos detectar cambios en el texto interno
            if (mutation.type === 'childList' && mutation.target.nodeType === Node.ELEMENT_NODE) {
                console.log('💬 Contenido de texto modificado');
                agregarAlLog(logAtributos, '💬 TEXTO modificado en el elemento', 'text-orange-600');
            }
        });
    });
    
    // 8. Configurar qué tipo de cambios observar en atributos
    const config = {
        attributes: true,           // Observar cambios en atributos
        attributeOldValue: true,    // Guardar el valor anterior del atributo
        attributeFilter: ['class', 'style', 'id'], // Solo observar estos atributos específicos
        childList: true,            // También observar cambios en contenido de texto
        subtree: true              // Observar descendientes también
    };
    
    // 9. Iniciar la observación
    observer.observe(elemento, config);
    console.log('✅ Observador de atributos configurado correctamente');
    
    // Mensaje inicial en el log
    agregarAlLog(logAtributos, '🔍 Observador de atributos iniciado...', 'text-blue-600');
}

// ===================================================================
// 🛠️ FUNCIONES DE UTILIDAD
// ===================================================================

/**
 * Función para agregar mensajes al log con timestamp
 * @param {HTMLElement} logElement - Elemento donde mostrar el log
 * @param {string} mensaje - Mensaje a mostrar
 * @param {string} colorClase - Clase de color de Tailwind
 */
function agregarAlLog(logElement, mensaje, colorClase = 'text-gray-600') {
    // Crear timestamp
    const timestamp = new Date().toLocaleTimeString();
    
    // Crear elemento del log
    const logEntry = document.createElement('div');
    logEntry.className = `mb-1 ${colorClase}`;
    logEntry.innerHTML = `<span class="text-gray-400">[${timestamp}]</span> ${mensaje}`;
    
    // Agregar al contenedor del log
    logElement.appendChild(logEntry);
    
    // Hacer scroll automático hacia abajo
    logElement.scrollTop = logElement.scrollHeight;
    
    // Limitar el número de entradas del log (mantener solo las últimas 50)
    if (logElement.children.length > 50) {
        logElement.removeChild(logElement.firstChild);
    }
}

/**
 * Función para crear un nuevo elemento en el ejercicio 1
 */
function crearNuevoElemento() {
    console.log('🏗️ Creando nuevo elemento...');
    
    // Incrementar contador
    contadorElementos++;
    
    // Crear el elemento
    const nuevoElemento = document.createElement('div');
    nuevoElemento.id = `elemento-${contadorElementos}`;
    nuevoElemento.className = 'bg-blue-100 border border-blue-300 p-4 m-2 rounded-lg transition-all duration-300 hover:bg-blue-200';
    nuevoElemento.innerHTML = `
        <div class="flex items-center justify-between">
            <span class="font-semibold text-blue-800">Elemento #${contadorElementos}</span>
            <span class="text-sm text-blue-600">ID: ${nuevoElemento.id}</span>
        </div>
        <p class="text-sm text-blue-700 mt-2">Creado a las ${new Date().toLocaleTimeString()}</p>
    `;
    
    return nuevoElemento;
}

/**
 * Función para generar un color aleatorio
 */
function obtenerColorAleatorio() {
    const coloresRandom = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff'];
    return coloresRandom[Math.floor(Math.random() * coloresRandom.length)];
}

// ===================================================================
// 🎮 EVENT LISTENERS Y CONFIGURACIÓN INICIAL
// ===================================================================

// Función principal que se ejecuta cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Inicializando aplicación MutationObserver...');
    
    // Configurar ambos observadores
    configurarObservadorElementos();
    configurarObservadorAtributos();
    
    // ===================================================================
    // 📝 EVENT LISTENERS PARA EJERCICIO 1 (Elementos)
    // ===================================================================
    
    // Botón para agregar elemento
    document.getElementById('agregarElemento').addEventListener('click', () => {
        console.log('🔘 Click en agregar elemento');
        const contenedor = document.getElementById('contenedorObservado');
        const nuevoElemento = crearNuevoElemento();
        
        // Agregar al contenedor (esto disparará el MutationObserver)
        contenedor.appendChild(nuevoElemento);
    });
    
    // Botón para eliminar elemento
    document.getElementById('eliminarElemento').addEventListener('click', () => {
        console.log('🔘 Click en eliminar elemento');
        const contenedor = document.getElementById('contenedorObservado');
        const ultimoElemento = contenedor.lastElementChild;
        
        if (ultimoElemento && ultimoElemento.id.startsWith('elemento-')) {
            // Remover del contenedor (esto disparará el MutationObserver)
            contenedor.removeChild(ultimoElemento);
        } else {
            console.log('⚠️ No hay elementos para eliminar');
        }
    });
    
    // Botón para modificar texto
    document.getElementById('modificarTexto').addEventListener('click', () => {
        console.log('🔘 Click en modificar texto');
        const contenedor = document.getElementById('contenedorObservado');
        const ultimoElemento = contenedor.lastElementChild;
        
        if (ultimoElemento && ultimoElemento.id.startsWith('elemento-')) {
            const nuevoTexto = `Texto modificado a las ${new Date().toLocaleTimeString()}`;
            ultimoElemento.querySelector('.text-blue-700').textContent = nuevoTexto;
        }
    });
    
    // Botón para limpiar log de elementos
    document.getElementById('limpiarLog').addEventListener('click', () => {
        const logEventos = document.getElementById('logEventos');
        logEventos.innerHTML = '';
        agregarAlLog(logEventos, '🧹 Log limpiado', 'text-gray-500');
    });
    
    // ===================================================================
    // 🎨 EVENT LISTENERS PARA EJERCICIO 2 (Atributos)
    // ===================================================================
    
    // Botón para cambiar color de fondo
    document.getElementById('cambiarColor').addEventListener('click', () => {
        console.log('🔘 Click en cambiar color');
        const elemento = document.getElementById('elementoObservado');
        
        // Cambiar a siguiente color en el array
        colorActual = (colorActual + 1) % colores.length;
        
        // Remover todas las clases de color anteriores
        colores.forEach(color => elemento.classList.remove(color));
        
        // Agregar nueva clase de color (esto disparará el MutationObserver)
        elemento.classList.add(colores[colorActual]);
    });
    
    // Botón para cambiar clase (tamaño)
    document.getElementById('cambiarClase').addEventListener('click', () => {
        console.log('🔘 Click en cambiar clase');
        const elemento = document.getElementById('elementoObservado');
        
        // Cambiar a siguiente tamaño en el array
        tamañoActual = (tamañoActual + 1) % tamaños.length;
        
        // Remover todas las clases de tamaño anteriores
        tamaños.forEach(tamaño => elemento.classList.remove(tamaño));
        
        // Agregar nueva clase de tamaño (esto disparará el MutationObserver)
        elemento.classList.add(tamaños[tamañoActual]);
    });
    
    // Botón para cambiar estilo inline
    document.getElementById('cambiarEstilo').addEventListener('click', () => {
        console.log('🔘 Click en cambiar estilo');
        const elemento = document.getElementById('elementoObservado');
        
        // Cambiar estilo inline (esto disparará el MutationObserver)
        elemento.style.border = `3px solid ${obtenerColorAleatorio()}`;
        elemento.style.borderRadius = `${Math.random() * 20 + 10}px`;
    });
    
    // Botón para cambiar texto
    document.getElementById('cambiarTextoInput').addEventListener('click', () => {
        console.log('🔘 Click en cambiar texto');
        const elemento = document.getElementById('elementoObservado');
        const input = document.getElementById('nuevoTexto');
        
        if (input.value.trim()) {
            // Cambiar el contenido del texto (esto disparará el MutationObserver)
            elemento.innerHTML = `
                ${input.value} 🎯
                <br>
                <span class="text-sm text-gray-600">Texto actualizado a las ${new Date().toLocaleTimeString()}</span>
            `;
            input.value = ''; // Limpiar input
        } else {
            alert('Por favor, escribe algo en el campo de texto');
        }
    });
    
    // Botón para limpiar log de atributos
    document.getElementById('limpiarLogAtributos').addEventListener('click', () => {
        const logAtributos = document.getElementById('logAtributos');
        logAtributos.innerHTML = '';
        agregarAlLog(logAtributos, '🧹 Log limpiado', 'text-gray-500');
    });
    
    console.log('✅ Aplicación inicializada correctamente');
    console.log('💡 Consejo: Abre las herramientas de desarrollador para ver más detalles en la consola');
});

// ===================================================================
// 📚 INFORMACIÓN ADICIONAL PARA APRENDIZAJE
// ===================================================================

/**
 * 🎓 CONCEPTOS CLAVE DE MUTATIONOBSERVER:
 * 
 * 1. TIPOS DE MUTACIONES:
 *    - childList: Cambios en nodos hijos (agregar/remover elementos)
 *    - attributes: Cambios en atributos (class, style, id, etc.)
 *    - characterData: Cambios en contenido de texto
 * 
 * 2. CONFIGURACIÓN COMÚN:
 *    - childList: true          // Observar cambios en hijos
 *    - subtree: true           // Observar también descendientes
 *    - attributes: true        // Observar cambios en atributos
 *    - attributeOldValue: true // Guardar valor anterior
 *    - characterData: true     // Observar cambios en texto
 * 
 * 3. VENTAJAS VS EVENTOS TRADICIONALES:
 *    - Más eficiente que DOMSubtreeModified
 *    - Agrupa múltiples cambios en un solo callback
 *    - Proporciona más información sobre los cambios
 *    - Mejor rendimiento
 * 
 * 4. CASOS DE USO COMUNES:
 *    - Formularios dinámicos (como nuestro utils.js)
 *    - Aplicaciones SPA que cambian el DOM
 *    - Herramientas de debugging
 *    - Bibliotecas de componentes
 *    - Análisis de comportamiento de usuario
 */
