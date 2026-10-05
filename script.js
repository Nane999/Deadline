document.addEventListener('DOMContentLoaded', () => {
  
  // 1. REAL-TIME BINARY CONVERTER
  const input = document.getElementById('demoInput');
  const charCount = document.getElementById('charCount');
  const byteCount = document.getElementById('byteCount');
  const bitCount = document.getElementById('bitCount');
  const avgByte = document.getElementById('avgByte');
  const binaryOutput = document.getElementById('binaryOutput');
  const copyBtn = document.getElementById('copyBinaryBtn');

  function analyzeText() {
    const text = input.value;
    const chars = text.length;
    
    // UTF-8 Byte calculation
    const encoder = new TextEncoder();
    const bytes = encoder.encode(text);
    const totalBytes = bytes.length;
    const totalBits = totalBytes * 8;
    const average = chars > 0 ? (totalBytes / chars).toFixed(1) : 0;

    let binaryArray = [];
    bytes.forEach(byte => {
      binaryArray.push(byte.toString(2).padStart(8, '0'));
    });

    charCount.textContent = chars;
    byteCount.textContent = `${totalBytes} Byte`;
    bitCount.textContent = `${totalBits} Bit`;
    avgByte.textContent = `${average} B/char`;
    
    if (text.length === 0) {
      binaryOutput.textContent = 'Գրեք որևէ բան վերևի դաշտում...';
    } else {
      binaryOutput.textContent = binaryArray.join(' ');
    }
  }

  input.addEventListener('input', analyzeText);
  analyzeText();

  // Copy Binary Button
  copyBtn.addEventListener('click', () => {
    navigator.clipboard.writeText(binaryOutput.textContent);
    alert('Բինար կոդը պատճենվեց։');
  });


  // 2. RAM VISUALIZER DEMO
  const ramGrid = document.getElementById('ramGrid');
  const ramInfo = document.getElementById('ramInfo');
  const ramBtns = document.querySelectorAll('.ram-btn');

  const ramPresets = {
    'int': {
      bytes: 4,
      name: 'Integer (32-bit)',
      val: '00000000 00000000 00000000 00101010',
      desc: 'Ամբողջ թիվը (օր․ 42) RAM-ում զբաղեցնում է 4 հարևան բջիջ (4 Bytes = 32 Bits):'
    },
    'char': {
      bytes: 1,
      name: 'Char \'A\' (ASCII)',
      val: '01000001',
      desc: 'ASCII տառը \'A\' (կոդը 65) զբաղեցնում է ընդամենը 1 բայթ:'
    },
    'hy-char': {
      bytes: 2,
      name: 'Armenian \'Ա\' (UTF-8)',
      val: '11010101 10000000',
      desc: 'Հայերեն \'Ա\' տառը UTF-8-ում պահանջում է 2 բայթ հիշողություն:'
    },
    'emoji': {
      bytes: 4,
      name: 'Emoji \'🚀\' (UTF-8)',
      val: '11110000 10011111 10011000 10000000',
      desc: 'Էմոջիները ունեն բարդ Unicode կոդեր և զբաղեցնում են 4 բայթ:'
    },
    'double': {
      bytes: 8,
      name: 'Double (64-bit Float)',
      val: '64-bit IEEE 754 Format',
      desc: 'Բարձր ճշգրտության տասնորդական թիվը զբաղեցնում է 8 բայթ:'
    }
  };

  function renderRAM(typeKey) {
    const preset = ramPresets[typeKey];
    ramGrid.innerHTML = '';

    // Create 12 RAM slots
    for (let i = 0; i < 12; i++) {
      const hexAddr = '0x00F' + (10 + i).toString(16).toUpperCase();
      const isAllocated = i >= 2 && i < (2 + preset.bytes);
      
      const cell = document.createElement('div');
      cell.className = `ram-cell ${isAllocated ? 'allocated' : ''}`;
      cell.innerHTML = `
        <span class="ram-addr">${hexAddr}</span>
        <span class="ram-val">${isAllocated ? 'BYTE' : 'FREE'}</span>
      `;
      ramGrid.appendChild(cell);
    }

    ramInfo.innerHTML = `<strong>${preset.name}:</strong> ${preset.desc}`;
  }

  ramBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      ramBtns.forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      renderRAM(e.target.dataset.type);
    });
  });

  renderRAM('int');


  // 3. FAQ ACCORDION
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(q => {
    q.addEventListener('click', () => {
      const faqItem = q.parentElement;
      faqItem.classList.toggle('active');
    });
  });

});