/* ══════════════════════════════════════════════════════════════
   script.js — AJ Dent
   Contiene: fade animations, galería, lightbox, chatbot, EmailJS,
             servicios mobile panel, instagram float
══════════════════════════════════════════════════════════════ */

/* ── Fade-in observer ──────────────────────────────────────── */
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) e.target.classList.add('visible');
        });
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
);
document.querySelectorAll('.fade-in-up').forEach(el => observer.observe(el));

/* ══════════════════════════════════════════════════════════════
   DATOS GALERÍA
══════════════════════════════════════════════════════════════ */
const casos = [
    {
        tag: "Blanqueamiento",
        titulo: "Blanqueamiento dental profesional",
        descripcion: "Paciente con manchas por consumo de café y tabaco. Se realizó blanqueamiento profesional en consultorio con lámpara LED de alta potencia, logrando aclarar el tono 8 niveles en una sola sesión.",
        detalles: [
            { icon: "fa-clock",        texto: "Duración del procedimiento: 1.5 horas" },
            { icon: "fa-calendar-check", texto: "Sesiones realizadas: 1" },
            { icon: "fa-star",         texto: "Resultado: 8 tonos más claro" },
            { icon: "fa-shield-alt",   texto: "Sin sensibilidad post-tratamiento" },
        ],
        imgAntes: "assets/antes.jpeg",
        imgDespues: "assets/depues.jpeg",
        whatsapp: "Hola%2C%20vi%20la%20galer%C3%ADa%20y%20me%20interesa%20el%20Blanqueamiento%20Dental.%20Me%20pueden%20dar%20m%C3%A1s%20informaci%C3%B3n%3F"
    },
    {
        tag: "Ortodoncia",
        titulo: "Corrección con brackets",
        descripcion: "Agrega aquí la descripción de este caso.",
        detalles: [
            { icon: "fa-clock", texto: "Duración: X meses" },
            { icon: "fa-star",  texto: "Resultado: Descripción del resultado" },
        ],
        imgAntes: null,
        imgDespues: null,
        whatsapp: "Hola%2C%20me%20interesa%20el%20tratamiento%20de%20Ortodoncia.%20Me%20pueden%20dar%20m%C3%A1s%20informaci%C3%B3n%3F"
    },
    {
        tag: "Restauración",
        titulo: "Restauración con resina",
        descripcion: "Agrega aquí la descripción de este caso.",
        detalles: [
            { icon: "fa-clock", texto: "Duración: X horas" },
            { icon: "fa-star",  texto: "Resultado: Descripción del resultado" },
        ],
        imgAntes: null,
        imgDespues: null,
        whatsapp: "Hola%2C%20me%20interesa%20el%20tratamiento%20de%20Restauraci%C3%B3n.%20Me%20pueden%20dar%20m%C3%A1s%20informaci%C3%B3n%3F"
    },
    {
        tag: "Prótesis",
        titulo: "Prótesis dental fija",
        descripcion: "Agrega aquí la descripción de este caso.",
        detalles: [
            { icon: "fa-clock", texto: "Duración: X días" },
            { icon: "fa-star",  texto: "Resultado: Descripción del resultado" },
        ],
        imgAntes: null,
        imgDespues: null,
        whatsapp: "Hola%2C%20me%20interesa%20el%20tratamiento%20de%20Pr%C3%B3tesis.%20Me%20pueden%20dar%20m%C3%A1s%20informaci%C3%B3n%3F"
    },
    {
        tag: "Limpieza",
        titulo: "Profilaxis profunda",
        descripcion: "Agrega aquí la descripción de este caso.",
        detalles: [
            { icon: "fa-clock", texto: "Duración: 1 hora" },
            { icon: "fa-star",  texto: "Resultado: Descripción del resultado" },
        ],
        imgAntes: null,
        imgDespues: null,
        whatsapp: "Hola%2C%20me%20interesa%20la%20Limpieza%20Profunda.%20Me%20pueden%20dar%20m%C3%A1s%20informaci%C3%B3n%3F"
    },
    {
        tag: "Canal",
        titulo: "Tratamiento de canal",
        descripcion: "Agrega aquí la descripción de este caso.",
        detalles: [
            { icon: "fa-clock", texto: "Duración: X horas" },
            { icon: "fa-star",  texto: "Resultado: Descripción del resultado" },
        ],
        imgAntes: null,
        imgDespues: null,
        whatsapp: "Hola%2C%20me%20interesa%20el%20Tratamiento%20de%20Canal.%20Me%20pueden%20dar%20m%C3%A1s%20informaci%C3%B3n%3F"
    },
];

/* ══════════════════════════════════════════════════════════════
   GALERÍA OVERLAY
══════════════════════════════════════════════════════════════ */
function abrirGaleria() {
    const overlay = document.getElementById('galeriaOverlay');
    overlay.style.display = 'block';
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
        overlay.style.opacity = '1';
        overlay.scrollTop = 0;
    });
}

function cerrarGaleria() {
    const overlay = document.getElementById('galeriaOverlay');
    overlay.style.opacity = '0';
    setTimeout(() => {
        overlay.style.display = 'none';
        document.body.style.overflow = '';
    }, 400);
}

/* ══════════════════════════════════════════════════════════════
   LIGHTBOX
══════════════════════════════════════════════════════════════ */
function abrirLightbox(idx) {
    const caso   = casos[idx];
    const lb     = document.getElementById('lightbox');
    const lbImgs = document.getElementById('lbImgs');

    const tieneImgs = caso.imgAntes && caso.imgDespues;
    lbImgs.innerHTML = tieneImgs
        ? `<div class="lb-col"><img src="${caso.imgAntes}" alt="Antes"><div class="lb-label">ANTES</div></div>
           <div class="lb-col"><img src="${caso.imgDespues}" alt="Después"><div class="lb-label">DESPUÉS</div></div>`
        : `<div style="grid-column:1/-1;height:180px;background:linear-gradient(135deg,#e0f2fe,#d1fae5);display:flex;align-items:center;justify-content:center;color:var(--primary);opacity:0.5;font-size:3rem;">
             <i class="fas fa-image"></i>
           </div>`;

    document.getElementById('lbTag').textContent         = caso.tag;
    document.getElementById('lbTitulo').textContent      = caso.titulo;
    document.getElementById('lbDescripcion').textContent = caso.descripcion;
    document.getElementById('lbWhatsapp').href           = `https://wa.me/18494892788?text=${caso.whatsapp}`;

    const det = document.getElementById('lbDetalles');
    det.innerHTML = caso.detalles.map(d =>
        `<div class="lb-detail-row"><i class="fas ${d.icon}"></i><span>${d.texto}</span></div>`
    ).join('');

    lb.style.display   = 'flex';
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => { lb.style.opacity = '1'; });
}

function cerrarLightbox() {
    const lb = document.getElementById('lightbox');
    lb.style.opacity = '0';
    setTimeout(() => {
        lb.style.display = 'none';
        document.body.style.overflow = 'hidden'; // galería sigue abierta
    }, 300);
}

// Cerrar con Escape
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const lb = document.getElementById('lightbox');
        if (lb.style.display !== 'none') { cerrarLightbox(); return; }
        const ov = document.getElementById('galeriaOverlay');
        if (ov.style.display !== 'none') cerrarGaleria();
    }
});

/* ══════════════════════════════════════════════════════════════
   SERVICIOS MOBILE PANEL
══════════════════════════════════════════════════════════════ */
const serviciosData = [
    { nombre: "Evaluación dental",          desc: "Revisión inicial completa",       precio: "Gratis",     wa: "Hola%2C%20quiero%20agendar%20mi%20Evaluaci%C3%B3n%20Dental%20gratuita.%20Me%20pueden%20dar%20disponibilidad%3F" },
    { nombre: "Caries Simple",              desc: "Tratamiento básico",              precio: "RD$ 300",    wa: "Hola%2C%20me%20interesa%20el%20tratamiento%20de%20Caries%20Simple%20%28RD%24%20300%29.%20Me%20pueden%20dar%20disponibilidad%3F" },
    { nombre: "Restauraciones",             desc: "Corrección de caries",            precio: "RD$ 500",    wa: "Hola%2C%20me%20interesa%20el%20servicio%20de%20Restauraciones%20Dentales%20%28RD%24%20500%29.%20Me%20pueden%20dar%20disponibilidad%3F" },
    { nombre: "Limpieza Profunda",          desc: "Profilaxis profesional",          precio: "RD$ 1,500",  wa: "Hola%2C%20me%20interesa%20la%20Limpieza%20Profunda%20%28Profilaxis%29%20%28RD%24%201%2C500%29.%20Me%20pueden%20dar%20disponibilidad%3F" },
    { nombre: "Brackets",                   desc: "Por arcada",                      precio: "RD$ 3,500",  wa: "Hola%2C%20me%20interesa%20el%20servicio%20de%20Brackets%20%28RD%24%203%2C500%20por%20arcada%29.%20Me%20pueden%20dar%20informaci%C3%B3n%20y%20disponibilidad%3F" },
    { nombre: "Componentes de Brackets",    desc: "Botones, tubos y educadores",     precio: "RD$ 300",    wa: "Hola%2C%20necesito%20informaci%C3%B3n%20sobre%20Componentes%20de%20Brackets%20%28botones%2C%20tubos%2C%20educadores%29%20%28RD%24%20300%29.%20Me%20pueden%20ayudar%3F" },
    { nombre: "Mantenimiento de brackets",  desc: "Activación mensual",              precio: "RD$ 700",    wa: "Hola%2C%20quiero%20agendar%20mi%20Mantenimiento%20de%20Brackets%20mensual%20%28RD%24%20700%29.%20Me%20dan%20disponibilidad%3F" },
    { nombre: "Extracción Simple",          desc: "Cirugía básica",                  precio: "RD$ 1,000",  wa: "Hola%2C%20me%20interesa%20la%20Extracci%C3%B3n%20Dental%20Simple%20%28RD%24%201%2C000%29.%20Me%20pueden%20dar%20disponibilidad%3F" },
    { nombre: "Extracción de Cordal",       desc: "Tercer molar",                    precio: "RD$ 3,500",  wa: "Hola%2C%20me%20interesa%20la%20Extracci%C3%B3n%20del%20Tercer%20Molar%20%28Cordal%29%20%28RD%24%203%2C500%29.%20Me%20pueden%20dar%20informaci%C3%B3n%20y%20disponibilidad%3F" },
    { nombre: "Anestesia Extra",            desc: "Procedimiento especial",          precio: "RD$ 500",    wa: "Hola%2C%20tengo%20una%20consulta%20sobre%20la%20Anestesia%20Extra%20%28RD%24%20500%29.%20Me%20pueden%20dar%20informaci%C3%B3n%3F" },
    { nombre: "Retenedor Fijo",             desc: "Ortodoncia",                      precio: "RD$ 3,500",  wa: "Hola%2C%20me%20interesa%20el%20Retenedor%20Fijo%20%28RD%24%203%2C500%29.%20Me%20pueden%20dar%20disponibilidad%3F" },
    { nombre: "Retenedor Estético",         desc: "Transparente",                    precio: "RD$ 3,000",  wa: "Hola%2C%20me%20interesa%20el%20Retenedor%20Est%C3%A9tico%20Transparente%20%28RD%24%203%2C000%29.%20Me%20pueden%20dar%20disponibilidad%3F" },
    { nombre: "Tratamiento de Canal",       desc: "Endodoncia",                      precio: "RD$ 6,000",  wa: "Hola%2C%20me%20interesa%20el%20Tratamiento%20de%20Canal%20%28Endodoncia%29%20%28RD%24%206%2C000%29.%20Me%20pueden%20dar%20informaci%C3%B3n%20y%20disponibilidad%3F" },
    { nombre: "Perno Dental",               desc: "Refuerzo estructural",            precio: "RD$ 3,000",  wa: "Hola%2C%20me%20interesa%20el%20Perno%20Dental%20%28RD%24%203%2C000%29.%20Me%20pueden%20dar%20informaci%C3%B3n%20y%20disponibilidad%3F" },
    { nombre: "Blanqueamiento",             desc: "Por sesión",                      precio: "RD$ 2,500",  wa: "Hola%2C%20me%20interesa%20el%20Blanqueamiento%20Dental%20%28RD%24%202%2C500%20por%20sesi%C3%B3n%29.%20Me%20pueden%20dar%20disponibilidad%3F" },
];

function abrirServiciosMobile() {
    const panel = document.getElementById('mobileServicesPanel');

    // Build list if empty
    const list = document.getElementById('mobileServicesList');
    if (!list.children.length) {
        list.innerHTML = serviciosData.map(s => `
            <div class="mobile-service-item">
                <div class="mobile-service-info">
                    <h4>${s.nombre}</h4>
                    <p>${s.desc}</p>
                </div>
                <div style="display:flex;align-items:center;gap:10px;flex-shrink:0;">
                    <span class="mobile-service-price">${s.precio}</span>
                    <a href="https://wa.me/18494892788?text=${s.wa}" target="_blank" class="mobile-service-wa">
                        <i class="fab fa-whatsapp"></i>
                    </a>
                </div>
            </div>
        `).join('');
    }

    panel.style.display = 'block';
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => panel.classList.add('open'));
}

function cerrarServiciosMobile() {
    const panel = document.getElementById('mobileServicesPanel');
    panel.classList.remove('open');
    setTimeout(() => {
        panel.style.display = 'none';
        document.body.style.overflow = '';
    }, 300);
}

/* ══════════════════════════════════════════════════════════════
   CHATBOT
══════════════════════════════════════════════════════════════ */

const SYSTEM_PROMPT = `Eres el asistente virtual de AJ Dent, una clínica dental moderna ubicada en Santo Domingo, República Dominicana. Tu nombre es "Asistente AJ Dent".

SERVICIOS Y PRECIOS:
- Evaluación dental: GRATIS
- Caries simple: RD$ 300
- Restauraciones: RD$ 500
- Limpieza profunda (Profilaxis): RD$ 1,500
- Brackets (por arcada): RD$ 3,500
- Componentes de brackets: RD$ 300
- Mantenimiento de brackets: RD$ 700
- Extracción simple: RD$ 1,000
- Extracción de cordal (tercer molar): RD$ 3,500
- Anestesia extra: RD$ 500
- Retenedor fijo: RD$ 3,500
- Retenedor estético transparente: RD$ 3,000
- Tratamiento de canal (endodoncia): RD$ 6,000
- Perno dental: RD$ 3,000
- Blanqueamiento (por sesión): RD$ 2,500

HORARIO:
- Lunes a Viernes: 9:00am – 8:00pm
- Sábado: 9:00am – 4:00pm
- Domingo: Cerrado

CONTACTO:
- WhatsApp: 849-489-2788
- Instagram: @aj.dent.do
- Ubicación exacta: Plaza Chess, segundo nivel, 3er local, Calle Costa Rica 43, Santo Domingo Este 11501

INSTRUCCIONES:
- Responde SIEMPRE en español
- Sé amable, breve y profesional
- Si preguntan por cita o quieren agendar, dales el WhatsApp: 849-489-2788
- Si preguntan algo que no sabes, invítalos a contactar por WhatsApp
- No inventes precios ni servicios que no están en la lista
- Máximo 3-4 líneas por respuesta
- Usa emojis con moderación`;

let chatHistory = [];
let chatOpen    = false;

function toggleChat() {
    chatOpen = !chatOpen;
    const win   = document.getElementById('chatWindow');
    const badge = document.querySelector('.chat-badge');

    if (chatOpen) {
        win.style.display = 'flex';
        if (badge) badge.style.display = 'none';
        document.getElementById('chatInput').focus();
    } else {
        win.style.display = 'none';
    }
}

async function sendMessage() {
    const input = document.getElementById('chatInput');
    const msg   = input.value.trim();
    if (!msg) return;

    input.value = '';
    document.getElementById('chatSend').disabled = true;

    appendMessage('user', msg);
    chatHistory.push({ role: 'user', content: msg });

    const typing = showTyping();

    try {
const response = await fetch('http://localhost:3000/api/chat', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        messages: [
            { role: 'system', content: SYSTEM_PROMPT },
            ...chatHistory
        ]
    })
});

        const data     = await response.json();
        const botReply = data.choices?.[0]?.message?.content
            || 'Lo siento, hubo un error. Por favor escríbenos al WhatsApp: 849-489-2788';

        typing.remove();
        appendMessage('bot', botReply);
        chatHistory.push({ role: 'assistant', content: botReply });

    } catch (err) {
        typing.remove();
        appendMessage('bot', '⚠️ Error de conexión. Por favor escríbenos directamente al WhatsApp: 849-489-2788');
    }

    document.getElementById('chatSend').disabled = false;
    input.focus();
}

function appendMessage(role, text) {
    const messages = document.getElementById('chatMessages');
    const div      = document.createElement('div');
    div.className  = `chat-msg ${role}`;
    div.innerHTML  = text.replace(/\n/g, '<br>');
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
}

function showTyping() {
    const messages = document.getElementById('chatMessages');
    const div      = document.createElement('div');
    div.className  = 'chat-typing';
    div.innerHTML  = '<span></span><span></span><span></span>';
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
    return div;
}

/* ══════════════════════════════════════════════════════════════
   EMAILJS — CONTACT FORM
══════════════════════════════════════════════════════════════ */
(function initEmailJS() {
    // EmailJS is loaded via CDN in index.html
    window.addEventListener('load', () => {
        if (typeof emailjs !== 'undefined') {
            emailjs.init('0XXsEjjIYMPQxuCa9');
        }

        // Phone formatter
        const telInput = document.getElementById('telefono');
        if (telInput) {
            telInput.addEventListener('input', function () {
                let val = this.value.replace(/\D/g, '').substring(0, 10);
                if (val.length >= 7) {
                    val = val.replace(/(\d{3})(\d{3})(\d{0,4})/, '$1-$2-$3');
                } else if (val.length >= 4) {
                    val = val.replace(/(\d{3})(\d{0,3})/, '$1-$2');
                }
                this.value = val;
            });
        }

        // Contact form
        const form = document.getElementById('contactForm');
        if (form) {
            form.addEventListener('submit', function (e) {
                e.preventDefault();

                const btn      = document.getElementById('btnEnviar');
                const btnTexto = document.getElementById('btnTexto');
                const msgExito = document.getElementById('msgExito');
                const msgError = document.getElementById('msgError');

                btn.disabled      = true;
                btnTexto.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Enviando...';
                msgExito.style.display = 'none';
                msgError.style.display = 'none';

                const params = {
                    from_name: document.getElementById('nombre').value,
                    telefono:  document.getElementById('telefono').value,
                    reply_to:  document.getElementById('email').value,
                    message:   document.getElementById('motivo').value
                };

                emailjs.send('service_hxhdtxb', 'template_arj90ia', params)
                    .then(() => emailjs.send('service_hxhdtxb', 'template_0ie067y', params))
                    .then(() => {
                        msgExito.style.display = 'block';
                        btnTexto.innerHTML     = '✅ Enviado';
                        btn.style.background   = '#10b981';
                        form.reset();
                        setTimeout(() => {
                            btn.disabled       = false;
                            btnTexto.innerHTML = 'Enviar Mensaje';
                            btn.style.background = 'var(--primary)';
                        }, 4000);
                    })
                    .catch((err) => {
                        console.error('EmailJS error:', err);
                        msgError.style.display = 'block';
                        btn.disabled           = false;
                        btnTexto.innerHTML     = 'Enviar Mensaje';
                    });
            });
        }
    });
})();