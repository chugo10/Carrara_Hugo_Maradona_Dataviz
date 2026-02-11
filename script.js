// 📊 Premier graphique : Buts par phase
var chart1 = echarts.init(document.getElementById('chart1'));
var option1 = {
  title: {
    text: 'Buts par Coupe du Monde',
    left: 'center',
    textStyle: {
      color: '#222',
      fontWeight: 'bold',
      fontSize: 22
    }
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: { type: 'shadow' }
  },
  xAxis: {
    type: 'category',
    data: ['1982', '1986', '1990', '1994'],
    axisTick: { alignWithLabel: true }
  },
  yAxis: {
    type: 'value',
    name: 'Buts'
  },
  series: [{
    name: 'Buts',
    type: 'bar',
    data: [2, 5, 0, 1],
    itemStyle: {
      color: '#74a9d8'
    },
    emphasis: {
      itemStyle: {
        color: '#d4af37'
      }
    },
    animationDuration: 1000
  }]
};
chart1.setOption(option1);


// 📊 Deuxième graphique : Buts par année
var chart2 = echarts.init(document.getElementById('chart2'));
var option2 = {
  title: { text: "Buts de Maradona par année" },
  tooltip: {},
  xAxis: { type: 'category', data: ['1982', '1986', '1990'] },
  yAxis: { type: 'value' },
  series: [{
    name: 'Buts',
    type: 'line',
    data: [1, 6, 0],
    color: '#cc3300'
  }]
};
chart2.setOption(option2);

var chart3 = echarts.init(document.getElementById('chart3'));

var option3 = {
  title: { text: "Buts de Maradona par lieu" },
  tooltip: {},
  xAxis: { type: 'category', data: ['Buenos Aires', 'Mexico', 'Rome', 'Paris'] },
  yAxis: { type: 'value' },
  series: [{
    name: 'Buts',
    type: 'bar',
    data: [3, 2, 1, 0],
    color: '#339933'
  }]
};

chart3.setOption(option3);

// =============================
// 🔥 NOUVEAUX GRAPHIQUES DYNAMIQUES (basés sur maradona.json)
// =============================

// Charger les données depuis le fichier JSON
fetch('maradona.json')
  .then(res => res.json())
  .then(data => {
    console.log("✅ Données de Maradona chargées :", data);

    // ---- Préparation des données ----
    const saisons = data.statistiques.map(s => s.saison);
    const buts = data.statistiques.map(s => s.total?.buts || 0);
    const passes = data.statistiques.map(s => s.total?.passes || 0);

    // Calcul des buts par club
    const clubs = {};
    data.statistiques.forEach(s => {
      clubs[s.club] = (clubs[s.club] || 0) + (s.total?.buts || 0);
    });
    const nomsClubs = Object.keys(clubs);
    const butsClubs = Object.values(clubs);

    // === 📊 chart4 : Buts par saison ===
    const chart4 = echarts.init(document.getElementById('chart4'));
    const option4 = {
      title: { text: "Buts par saison (statistiques réelles)" },
      tooltip: { trigger: 'axis' },
      xAxis: { type: 'category', data: saisons, axisLabel: { rotate: 30 } },
      yAxis: { type: 'value' },
      series: [{
        name: 'Buts',
        type: 'bar',
        data: buts,
        color: '#1E90FF'
      }]
    };
    chart4.setOption(option4);

    // === 📈 chart5 : Buts vs Passes ===
    const chart5 = echarts.init(document.getElementById('chart5'));
    const option5 = {
      title: { text: "Buts vs Passes par saison" },
      tooltip: { trigger: 'axis' },
      legend: { data: ['Buts', 'Passes'] },
      xAxis: { type: 'category', data: saisons },
      yAxis: { type: 'value' },
      series: [
        { name: 'Buts', type: 'line', smooth: true, data: buts, color: '#E74C3C' },
        { name: 'Passes', type: 'line', smooth: true, data: passes, color: '#2ECC71' }
      ]
    };
    chart5.setOption(option5);

    // === 🥅 chart6 : Répartition des buts par club ===
    const chart6 = echarts.init(document.getElementById('chart6'));
    const option6 = {
      title: { text: "Répartition des buts par club" },
      tooltip: { trigger: 'item' },
      legend: { orient: 'vertical', left: 'left' },
      series: [{
        name: 'Buts',
        type: 'pie',
        radius: '50%',
        data: nomsClubs.map((c, i) => ({ name: c, value: butsClubs[i] })),
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    };
    chart6.setOption(option6);

    // === 🧠 chart7 : Profil technique (Radar) ===
    const chart7 = echarts.init(document.getElementById('chart7'));
    const option7 = {
      title: { text: "Profil technique", left: 'center' },
      tooltip: {},
      radar: {
        indicator: [
          { name: 'Dribble', max: 100 },
          { name: 'Passe', max: 100 },
          { name: 'Tir', max: 100 },
          { name: 'Endurance', max: 100 },
          { name: 'Vision', max: 100 }
        ]
      },
      series: [{
        type: 'radar',
        data: [{
          value: [95, 85, 90, 80, 88],
          name: 'Maradona'
        }]
      }]
    };
    chart7.setOption(option7);


  })
  .catch(err => console.error("❌ Erreur de chargement du JSON :", err));


document.getElementById('yearFilter').addEventListener('change', function() {
    var year = this.value;
    // Ici tu modifies les données des graphiques en fonction de "year"
    // Exemple : si year == '1986', affiche seulement les données de 1986
    // Sinon affiche toutes les données
    // Puis tu appelles setOption() à nouveau avec les nouvelles données
  });
  