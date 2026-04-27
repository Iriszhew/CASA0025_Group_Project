// ============================================================================
// Section 1: Global Styling, State Variables and Translation
// ============================================================================

// 1.1 Styling constants
var STYLES = {
  COLORS: {
    LOW: '#22c55e',
    MEDIUM: '#facc15',
    HIGH: '#ef4444',

    TEXT_PRIMARY: '#111827',
    TEXT_SECONDARY: '#4b5563',
    TEXT_MUTED: '#6b7280',

    DIVIDER: '#d1d5db',
    PANEL_BG: '#ffffff',
    PANEL_LIGHT_BG: '#f8fafc',

    SELECTED_BOROUGH: '#dc2626',
    OUTSIDE_DIM: '#000000'
  },

  SECTION_TITLE: {
    fontSize: '14px',
    fontWeight: 'bold',
    margin: '10px 0 5px 0',
    color: '#111827'
  },

  PANEL_TITLE: {
    fontSize: '20px',
    fontWeight: 'bold',
    margin: '0 0 6px 0',
    color: '#111827'
  },

  SUBTITLE: {
    fontSize: '12px',
    color: '#6b7280',
    margin: '0 0 8px 0'
  },

  DIVIDER: {
    height: '1px',
    backgroundColor: '#d1d5db',
    margin: '10px 0'
  }
};


// STYLE + HELPER FUNCTIONS

var UI_STYLE = {
  bg: '#ffffff',
  lightBg: '#f8fafc',
  border: '#d1d5db',
  text: '#111827',
  muted: '#6b7280',
  red: '#dc2626'
};


// ============================================================================
// 1.2 Global map and app state
// ============================================================================

// Important: create a custom ui.Map so it can be used inside ui.SplitPanel
var Map = ui.Map();

var selectedBoroughName = null;
var boroughPopup = null;
var loadingPanel = null;
var outsideLondonPopup = null;

var dashboardDataByName = {};
var boroughSelect = null;
var languageSelect = null;

var appTitleLabel = null;
var appSubtitleLabel = null;

var splitComparisonButton = null;

// Layer placeholders
var selectedBoroughLayer = null;
var meanLSTLayer = null;
var uhiPixelsLayer = null;
var greenCoverLayer = null;
var meanNDVILayer = null;
var hriLayer = null;

var legendPanel = null;

var loadingPanel = null;

// --------------------------------------------------------------------------
// 1.3 Multilingual text dictionary
// --------------------------------------------------------------------------
var currentLanguage = 'English';

var LANGUAGE_TRANSLATIONS = {
  'English': {
    'London Heat & Green Space Dashboard': 'London Heat Risk Assessment Tool',
    'Explore borough-level population density, heat exposure, green cover and vegetation indicators.':
      'Explore borough-level population density, heat exposure, green cover and vegetation indicators.',
    'Change Language': 'Change Language',
    'Select Borough': 'Select Borough',
    'Select a borough': 'Select a borough',
    'Reset View': 'Reset View',
    'No borough selected.': 'No borough selected.',
    'Choose a borough from the dropdown list or click directly on the map.':
      'Choose a borough from the dropdown list or click directly on the map.',
    'Borough-level summary indicators': 'Borough-level summary indicators',

    'Population': 'Population',
    'Population Density LQ': 'Population Density LQ',
    'Relative to the London average. Values above 1 indicate higher-than-average density.':
      'Relative to the London average. Values above 1 indicate higher-than-average density.',

    'Heat Exposure': 'Heat Exposure',
    'Mean Land Surface Temperature': 'Mean Land Surface Temperature',
    'Average summer LST derived from Landsat 8/9.':
      'Average summer LST derived from Landsat 8/9.',
    'Heat Risk Index': 'Heat Risk Index',
    'Borough-level heat risk index.': 'Borough-level heat risk index.',
    'UHI Proportion': 'UHI Proportion',
    'Share of borough pixels above the UHI threshold.':
      'Share of borough pixels above the UHI threshold.',

    'Green Space & Vegetation': 'Green Space & Vegetation',
    'Mean NDVI': 'Mean NDVI',
    'Higher NDVI generally indicates denser vegetation.':
      'Higher NDVI generally indicates denser vegetation.',
    'Green Cover': 'Green Cover',
    'Share of borough area classified as green cover.':
      'Share of borough area classified as green cover.',
    'Lack of Green Cover': 'Lack of Green Cover',
    'Higher values indicate lower green cover availability.':
      'Higher values indicate lower green cover availability.',

    'Loading borough dashboard data...': 'Loading borough dashboard data...',
    'Failed to load borough dashboard data.': 'Failed to load borough dashboard data.',
    'No indicator data available for: ': 'No indicator data available for: ',
    'Loading data for ': 'Loading data for ',
    'Close': 'Close',

    'Dim outside selected borough': 'Dim outside selected borough',
    'Selected Borough': 'Selected Borough',
    'Mean LST May-Sep 2022': 'Mean LST May-Sep 2022',
    'UHI pixels': 'London UHI Hotspots 2022',
    'Green cover': 'Green cover',
    'Mean NDVI May-Sep 2022': 'Mean NDVI May-Sep 2022',
    'London HRI': 'London HRI',
    
    'Heat Risk Index Scale': 'Heat Risk Index Scale',
'Very Low HRI 3.0–5.4': 'Very Low 3.0–5.4',
'Low HRI 5.4–7.8': 'Low 5.4–7.8',
'Medium HRI 7.8–10.2': 'Medium 7.8–10.2',
'High HRI 10.2–12.6': 'High 10.2–12.6',
'Very High HRI 12.6–15.0': 'Very High 12.6–15.0',

'Very Low Risk': 'Very Low Risk',
'Low Risk': 'Low Risk',
'Medium Risk': 'Medium Risk',
'High Risk': 'High Risk',
'Very High Risk': 'Very High Risk',

'Very Low Risk Boroughs': 'Very low risk boroughs',
'Low Risk Boroughs': 'Low risk boroughs',
'Medium Risk Boroughs': 'Medium risk boroughs',
'High Risk Boroughs': 'High risk boroughs',
'Very High Risk Boroughs': 'Very high risk boroughs',
    'HRI Formula': 'HRI = Density + Lack of Green Cover + UHI',
    'HRI Components': 'Each component is scored from 1 to 5. Total HRI ranges from 1 to 15.',
    
    'London Overview': 'London Overview',
'Average LST': 'Average LST',
'Average UHI Proportion': 'Average UHI Proportion',
'Average Green Cover': 'Average Green Cover',
'Average HRI': 'Average HRI',
'Heat Risk Distribution': 'Heat Risk Distribution',
'Low Risk Boroughs': 'Low risk boroughs',
'Medium Risk Boroughs': 'Medium risk boroughs',
'High Risk Boroughs': 'High risk boroughs',
'boroughs': 'boroughs',
'Top 5 Boroughs by HRI': 'Top 5 Boroughs by HRI',
'Overview instruction': 'Click a borough on the map or use the dropdown menu to explore local heat exposure, vegetation and heat risk indicators.',

'Total Population': 'Total Population',
'people': 'people',
'Based on 2021 Census population data.': 'Based on 2021 Census population data.',

'Integrated Heat Risk': 'Integrated Heat Risk',
'Risk Level': 'Risk Level',
'Low Risk': 'Low Risk',
'Medium Risk': 'Medium Risk',
'High Risk': 'High Risk',
'Heat risk classification based on the borough-level HRI score.':
  'Heat risk classification based on the borough-level HRI score.',
  
  'Split Comparison View': 'Split Comparison View',
'Back to Dashboard': 'Back to Dashboard',
'Left map layer': 'Left map layer',
'Right map layer': 'Right map layer',
'Population Density LQ': 'Population Density LQ',
'Borough boundaries': 'Borough boundaries',

'Map Display Mode': 'Map Display Mode',
'Compare different heat and green space layers side by side.':
  'Compare different heat and green space layers side by side.',
  
  'Clicked outside London': 'Clicked outside London',
'Please select a point within Greater London.': 'Please select a point within Greater London.',

'Reset to London Overview': 'Reset to London Overview',

  },

  '中文': {
   'London Heat & Green Space Dashboard': '伦敦热风险评估工具',
    'Explore borough-level population density, heat exposure, green cover and vegetation indicators.':
      '探索伦敦各区的人口密度、热暴露、绿地覆盖和植被指标。',
    'Change Language': '切换语言',
    'Select Borough': '选择行政区',
    'Select a borough': '请选择一个行政区',
    'Reset View': '重置视图',
    'No borough selected.': '尚未选择行政区。',
    'Choose a borough from the dropdown list or click directly on the map.':
      '请从下拉列表中选择行政区，或直接点击地图。',
    'Borough-level summary indicators': '行政区层面的指标概览',

    'Population': '人口',
    'Population Density LQ': '人口密度区位商',
    'Relative to the London average. Values above 1 indicate higher-than-average density.':
      '相对于伦敦平均水平。数值大于 1 表示人口密度高于伦敦平均水平。',

    'Heat Exposure': '热暴露',
    'Mean Land Surface Temperature': '平均地表温度',
    'Average summer LST derived from Landsat 8/9.':
      '基于 Landsat 8/9 计算的夏季平均地表温度。',
    'Heat Risk Index': '热风险指数',
    'Borough-level heat risk index.': '行政区层面的热风险指数。',
    'UHI Proportion': '城市热岛像元比例',
    'Share of borough pixels above the UHI threshold.':
      '行政区内高于城市热岛阈值的像元比例。',

    'Green Space & Vegetation': '绿地与植被',
    'Mean NDVI': '平均 NDVI',
    'Higher NDVI generally indicates denser vegetation.':
      'NDVI 越高通常表示植被覆盖越密集。',
    'Green Cover': '绿地覆盖率',
    'Share of borough area classified as green cover.':
      '行政区内被分类为绿地覆盖的面积比例。',
    'Lack of Green Cover': '绿地缺乏比例',
    'Higher values indicate lower green cover availability.':
      '数值越高表示绿地可达性或绿地覆盖相对不足。',

    'Loading borough dashboard data...': '正在加载行政区数据...',
    'Failed to load borough dashboard data.': '行政区数据加载失败。',
    'No indicator data available for: ': '没有可用指标数据：',
    'Loading data for ': '正在加载数据：',
    'Close': '关闭',

    'Dim outside selected borough': '弱化未选中的行政区',
    'Selected Borough': '已选择行政区',
    'Mean LST May-Sep 2022': '2022年5月至9月平均地表温度',
    'UHI pixels': '2022年伦敦城市热岛热点',
    'Green cover': '绿地覆盖',
    'Mean NDVI May-Sep 2022': '2022年5月至9月平均NDVI',
    'London HRI': '伦敦热风险指数',
    
    'Heat Risk Index Scale': '热风险指数等级',
'Very Low HRI 3.0–5.4': '极低风险 3.0–5.4',
'Low HRI 5.4–7.8': '低风险 5.4–7.8',
'Medium HRI 7.8–10.2': '中风险 7.8–10.2',
'High HRI 10.2–12.6': '高风险 10.2–12.6',
'Very High HRI 12.6–15.0': '极高风险 12.6–15.0',

'Very Low Risk': '极低风险',
'Low Risk': '低风险',
'Medium Risk': '中风险',
'High Risk': '高风险',
'Very High Risk': '极高风险',

'Very Low Risk Boroughs': '极低风险行政区',
'Low Risk Boroughs': '低风险行政区',
'Medium Risk Boroughs': '中风险行政区',
'High Risk Boroughs': '高风险行政区',
'Very High Risk Boroughs': '极高风险行政区',
    'HRI Formula': 'HRI = 人口密度 + 绿地覆盖不足 + 城市热岛效应',
    'HRI Components': '每个组成部分按 1 到 5 分计分，总 HRI 范围为 1 到 15。',
    
    'London Overview': '伦敦总体概览',
'Average LST': '平均地表温度',
'Average UHI Proportion': '平均城市热岛比例',
'Average Green Cover': '平均绿地覆盖率',
'Average HRI': '平均热风险指数',
'Heat Risk Distribution': '热风险等级分布',
'Low Risk Boroughs': '低风险行政区',
'Medium Risk Boroughs': '中风险行政区',
'High Risk Boroughs': '高风险行政区',
'boroughs': '个行政区',
'Top 5 Boroughs by HRI': '热风险指数最高的5个行政区',
'Overview instruction': '请点击地图上的行政区，或使用下拉菜单查看局部热暴露、植被和热风险指标。',

'Total Population': '总人口',
'people': '人',
'Based on 2021 Census population data.': '基于2021年人口普查数据。',

'Integrated Heat Risk': '综合热风险',
'Risk Level': '风险等级',
'Low Risk': '低风险',
'Medium Risk': '中风险',
'High Risk': '高风险',
'Heat risk classification based on the borough-level HRI score.':
  '基于行政区热风险指数得分划分的风险等级。',
  
  'Split Comparison View': '分屏图层对比',
'Back to Dashboard': '返回主仪表板',
'Left map layer': '左侧地图图层',
'Right map layer': '右侧地图图层',
'Population Density LQ': '人口密度区位商',
'Borough boundaries': '行政区边界',

'Map Display Mode': '地图显示模式',
'Compare different heat and green space layers side by side.':
  '并排对比不同的热环境与绿地指标图层。',
  
  'Clicked outside London': '已点击伦敦范围外',
'Please select a point within Greater London.': '请选择大伦敦范围内的一个点。',

'Reset to London Overview': '重置为伦敦概览',

  },
  
    'Türkçe': {
    'London Heat & Green Space Dashboard': 'Londra Isı Riski Değerlendirme Aracı',
    'Explore borough-level population density, heat exposure, green cover and vegetation indicators.':
      'İlçe düzeyinde nüfus yoğunluğu, ısı maruziyeti, yeşil alan örtüsü ve bitki örtüsü göstergelerini keşfedin.',
    'Change Language': 'Dili Değiştir',
    'Select Borough': 'İlçe Seç',
    'Select a borough': 'Bir ilçe seçin',
    'Reset View': 'Görünümü Sıfırla',
    'No borough selected.': 'Henüz bir ilçe seçilmedi.',
    'Choose a borough from the dropdown list or click directly on the map.':
      'Açılır listeden bir ilçe seçin veya doğrudan haritaya tıklayın.',
    'Borough-level summary indicators': 'İlçe düzeyinde özet göstergeler',

    'Population': 'Nüfus',
    'Population Density LQ': 'Nüfus Yoğunluğu LQ',
    'Relative to the London average. Values above 1 indicate higher-than-average density.':
      'Londra ortalamasına göre. 1’in üzerindeki değerler ortalamadan daha yüksek nüfus yoğunluğunu gösterir.',

    'Heat Exposure': 'Isı Maruziyeti',
    'Mean Land Surface Temperature': 'Ortalama Yüzey Sıcaklığı',
    'Average summer LST derived from Landsat 8/9.':
      'Landsat 8/9 verilerinden elde edilen ortalama yaz yüzey sıcaklığı.',
    'Heat Risk Index': 'Isı Risk Endeksi',
    'Borough-level heat risk index.': 'İlçe düzeyinde ısı risk endeksi.',
    'UHI Proportion': 'Kentsel Isı Adası Oranı',
    'Share of borough pixels above the UHI threshold.':
      'UHI eşiğinin üzerindeki ilçe piksellerinin oranı.',

    'Green Space & Vegetation': 'Yeşil Alan ve Bitki Örtüsü',
    'Mean NDVI': 'Ortalama NDVI',
    'Higher NDVI generally indicates denser vegetation.':
      'Daha yüksek NDVI genellikle daha yoğun bitki örtüsünü gösterir.',
    'Green Cover': 'Yeşil Alan Örtüsü',
    'Share of borough area classified as green cover.':
      'Yeşil alan örtüsü olarak sınıflandırılan ilçe alanının oranı.',
    'Lack of Green Cover': 'Yeşil Alan Eksikliği',
    'Higher values indicate lower green cover availability.':
      'Daha yüksek değerler daha düşük yeşil alan mevcudiyetini gösterir.',

    'Loading borough dashboard data...': 'İlçe gösterge panosu verileri yükleniyor...',
    'Failed to load borough dashboard data.': 'İlçe gösterge panosu verileri yüklenemedi.',
    'No indicator data available for: ': 'Şu ilçe için gösterge verisi yok: ',
    'Loading data for ': 'Veriler yükleniyor: ',
    'Close': 'Kapat',

    'Dim outside selected borough': 'Seçilen ilçe dışını karart',
    'Selected Borough': 'Seçilen İlçe',
    'Mean LST May-Sep 2022': 'Mayıs-Eylül 2022 Ortalama Yüzey Sıcaklığı',
    'UHI pixels': 'Londra UHI Sıcak Noktaları 2022',
    'Green cover': 'Yeşil alan örtüsü',
    'Mean NDVI May-Sep 2022': 'Mayıs-Eylül 2022 Ortalama NDVI',
    'London HRI': 'Londra HRI',
    
    'Heat Risk Index Scale': 'Isı Risk Endeksi Ölçeği',
'Very Low HRI 3.0–5.4': 'Çok Düşük 3.0–5.4',
'Low HRI 5.4–7.8': 'Düşük 5.4–7.8',
'Medium HRI 7.8–10.2': 'Orta 7.8–10.2',
'High HRI 10.2–12.6': 'Yüksek 10.2–12.6',
'Very High HRI 12.6–15.0': 'Çok Yüksek 12.6–15.0',

'Very Low Risk': 'Çok Düşük Risk',
'Low Risk': 'Düşük Risk',
'Medium Risk': 'Orta Risk',
'High Risk': 'Yüksek Risk',
'Very High Risk': 'Çok Yüksek Risk',

'Very Low Risk Boroughs': 'Çok düşük riskli ilçeler',
'Low Risk Boroughs': 'Düşük riskli ilçeler',
'Medium Risk Boroughs': 'Orta riskli ilçeler',
'High Risk Boroughs': 'Yüksek riskli ilçeler',
'Very High Risk Boroughs': 'Çok yüksek riskli ilçeler',
    'HRI Formula': 'HRI = Nüfus Yoğunluğu + Yeşil Alan Eksikliği + UHI',
    'HRI Components': 'Her bileşen 1 ile 5 arasında puanlanır. Toplam HRI 1 ile 15 arasındadır.',
    
    'London Overview': 'Londra Genel Görünümü',
'Average LST': 'Ortalama Yüzey Sıcaklığı',
'Average UHI Proportion': 'Ortalama Kentsel Isı Adası Oranı',
'Average Green Cover': 'Ortalama Yeşil Alan Örtüsü',
'Average HRI': 'Ortalama Isı Risk Endeksi',
'Heat Risk Distribution': 'Isı Riski Dağılımı',
'Low Risk Boroughs': 'Düşük riskli ilçeler',
'Medium Risk Boroughs': 'Orta riskli ilçeler',
'High Risk Boroughs': 'Yüksek riskli ilçeler',
'boroughs': 'ilçe',
'Top 5 Boroughs by HRI': 'HRI Değerine Göre İlk 5 İlçe',
'Overview instruction': 'Yerel ısı maruziyeti, bitki örtüsü ve ısı riski göstergelerini incelemek için haritadaki bir ilçeye tıklayın veya açılır menüyü kullanın.',

'Total Population': 'Toplam Nüfus',
'people': 'kişi',
'Based on 2021 Census population data.': '2021 nüfus sayımı verilerine dayanmaktadır.',

'Integrated Heat Risk': 'Bütünleşik Isı Riski',
'Risk Level': 'Risk Düzeyi',
'Low Risk': 'Düşük Risk',
'Medium Risk': 'Orta Risk',
'High Risk': 'Yüksek Risk',
'Heat risk classification based on the borough-level HRI score.':
  'İlçe düzeyindeki HRI puanına göre ısı riski sınıflandırması.',
  
'Split Comparison View': 'Bölünmüş Karşılaştırma Görünümü',
'Back to Dashboard': 'Panoya Geri Dön',
'Left map layer': 'Sol harita katmanı',
'Right map layer': 'Sağ harita katmanı',
'Population Density LQ': 'Nüfus Yoğunluğu LQ',
'Borough boundaries': 'İlçe sınırları',

'Map Display Mode': 'Harita Görünüm Modu',
'Compare different heat and green space layers side by side.':
  'Farklı ısı ve yeşil alan katmanlarını yan yana karşılaştırın.',
  
  'Clicked outside London': 'Londra dışına tıkladınız',
'Please select a point within Greater London.': 'Lütfen Büyük Londra içinde bir nokta seçin.',

'Reset to London Overview': 'Londra Genel Görünümüne Sıfırla',

  }
};

// --------------------------------------------------------------------------
// 1.4 Translation helper functions
// --------------------------------------------------------------------------

function translate(text) {
  if (!LANGUAGE_TRANSLATIONS[currentLanguage]) {
    return text;
  }
  return LANGUAGE_TRANSLATIONS[currentLanguage][text] || text;
}

function updateMapLayerNames() {
  Map.layers().forEach(function(layer) {
    var untranslatedName = layer.untranslatedName;

    if (untranslatedName) {
      layer.setName(translate(untranslatedName));
    }
  });
}


// ============================================================================
// Section 2: Data Imports and Preprocessing
// ============================================================================

// --------------------------------------------------------------------------
// 2.1 Import London boundaries and attribute tables
// --------------------------------------------------------------------------

var lsoa = ee.FeatureCollection('projects/casa-remote-sensing/assets/LSOA_2021');
var london = ee.FeatureCollection('projects/casa-remote-sensing/assets/LonBoundary');
var boroughs = ee.FeatureCollection('projects/casa-remote-sensing/assets/borough');
var census = ee.FeatureCollection('projects/casa-remote-sensing/assets/UKCensus');
var hriTable = ee.FeatureCollection('projects/casa-remote-sensing/assets/HRI');

print('LSOA sample:', lsoa.first());
print('London boundary sample:', london.first());
print('Borough sample:', boroughs.first());
print('Census sample:', census.first());
print('HRI table sample:', hriTable.first());


// --------------------------------------------------------------------------
// 2.2 Define common fields used for joins and labels
// --------------------------------------------------------------------------

var joinField = 'LSOA21CD';
var popField = 'TotRes21';
var areaField = 'LSOA21KM2';
var lsoaNameField = 'LSOA21NM';

var boroughCodeField = 'LAD22CD';
var boroughNameField = 'LAD22NM';


// --------------------------------------------------------------------------
// 2.3 Filter LSOA boundaries to Greater London
// --------------------------------------------------------------------------

var londonLsoa = lsoa.filterBounds(london.geometry());

print('London LSOA count:', londonLsoa.size());


// --------------------------------------------------------------------------
// 2.4 Join census population data to LSOA boundaries
// --------------------------------------------------------------------------

var censusJoin = ee.Join.saveFirst('matched');

var censusJoinFilter = ee.Filter.equals({
  leftField: joinField,
  rightField: joinField
});

var joinedLsoa = ee.FeatureCollection(
  censusJoin.apply(londonLsoa, census, censusJoinFilter)
).filter(ee.Filter.notNull(['matched']));

var lsoaWithPop = joinedLsoa.map(function(f) {
  var matched = ee.Feature(f.get('matched'));

  return f.set({
    population: ee.Number.parse(ee.String(matched.get(popField))),
    census_area_km2: ee.Number.parse(ee.String(matched.get(areaField)))
  });
});

print('LSOA with population sample:', lsoaWithPop.first());


// --------------------------------------------------------------------------
// 2.5 Prepare clean census table for borough-level aggregation
// --------------------------------------------------------------------------

var censusClean = census.map(function(f) {
  return f.set({
    pop: ee.Number.parse(ee.String(f.get(popField))),
    census_area_km2: ee.Number.parse(ee.String(f.get(areaField))),
    borough_name: f.get(boroughNameField),
    borough_code: f.get(boroughCodeField)
  });
});

print('Clean census table sample:', censusClean.first());


// --------------------------------------------------------------------------
// 2.6 Join HRI table to borough boundaries
// --------------------------------------------------------------------------

var hriJoin = ee.Join.inner();

var hriJoinFilter = ee.Filter.equals({
  leftField: boroughCodeField,
  rightField: boroughCodeField
});

var hriJoined = hriJoin.apply({
  primary: boroughs,
  secondary: hriTable,
  condition: hriJoinFilter
});

var hriBoroughs = ee.FeatureCollection(hriJoined.map(function(f) {
  var borough = ee.Feature(f.get('primary'));
  var hri = ee.Feature(f.get('secondary'));

  return borough.set({
    HRI: ee.Number.parse(ee.String(hri.get('HRI')))
  });
}));

print('HRI borough layer:');


// --------------------------------------------------------------------------
// 2.7 Set initial map view
// --------------------------------------------------------------------------

Map.centerObject(london, 9);


// ============================================================================
// Section 3: Indicator Calculation
// ============================================================================


// --------------------------------------------------------------------------
// 3.1 LSOA population density Location Quotient
// --------------------------------------------------------------------------
//
// This section calculates population density for each LSOA and compares it
// with the London-wide average density. The resulting Location Quotient (LQ)
// is used as a relative population pressure indicator.


var lsoaDensity = lsoaWithPop.map(function(f) {

  var areaKm2 = f.geometry().area(1).divide(1e6);
  var pop = ee.Number(f.get('population'));
  var popDensity = pop.divide(areaKm2);

  return f.set({
    area_km2: areaKm2,
    pop_density: popDensity
  });
});


// London baseline density
var totalPop = lsoaDensity.aggregate_sum('population');
var totalArea = lsoaDensity.aggregate_sum('area_km2');

var londonDensity = ee.Number(totalPop).divide(totalArea);

print('London average population density:');


// LSOA density LQ
var lsoaLQ = lsoaDensity.map(function(f) {

  var densityLQ = ee.Number(f.get('pop_density'))
    .divide(londonDensity);

  return f.set({
    density_LQ: densityLQ
  });
});


// LSOA LQ image
var lsoaLQImage = lsoaLQ.reduceToImage({
  properties: ['density_LQ'],
  reducer: ee.Reducer.first()
}).clip(london);

var lsoaLQVis = {
  min: 0.3,
  max: 3,
  palette: [
    '#ffffcc',
    '#c2e699',
    '#78c679',
    '#31a354',
    '#006837'
  ]
};


// --------------------------------------------------------------------------
// 3.2 Borough population density Location Quotient
// --------------------------------------------------------------------------
//
// This section aggregates population and area to borough level and calculates
// a borough-level density LQ for the dashboard summary panel.
// Sum population and area by borough
var groupedDensity = censusClean.reduceColumns({
  selectors: ['borough_name', 'pop', 'census_area_km2'],
  reducer: ee.Reducer.sum()
    .repeat(2)
    .group({
      groupField: 0,
      groupName: 'borough_name'
    })
});

var boroughDensityStats = ee.FeatureCollection(
  ee.List(groupedDensity.get('groups')).map(function(item) {

    item = ee.Dictionary(item);

    var sums = ee.List(item.get('sum'));
    var boroughPop = ee.Number(sums.get(0));
    var boroughArea = ee.Number(sums.get(1));
    var boroughDensity = boroughPop.divide(boroughArea);

    return ee.Feature(null, {
      borough_name: item.get('borough_name'),
      borough_pop: boroughPop,
      borough_area_km2: boroughArea,
      borough_density: boroughDensity
    });
  })
);


// London-wide density from census table
var londonPopCensus = censusClean.aggregate_sum('pop');
var londonAreaCensus = censusClean.aggregate_sum('census_area_km2');

var londonDensityFromCensus = ee.Number(londonPopCensus)
  .divide(londonAreaCensus);


// Calculate borough LQ
var boroughDensityLQTable = boroughDensityStats.map(function(f) {

  var densityLQ = ee.Number(f.get('borough_density'))
    .divide(londonDensityFromCensus);

  return f.set({
    density_LQ: densityLQ
  });
});


// Join borough density LQ back to borough boundary
var boroughDensityJoin = ee.Join.saveFirst('density_stats');

var boroughDensityJoinFilter = ee.Filter.equals({
  leftField: 'LAD22NM',
  rightField: 'borough_name'
});

var boroughDensityJoined = boroughDensityJoin.apply({
  primary: boroughs,
  secondary: boroughDensityLQTable,
  condition: boroughDensityJoinFilter
});

var boroughDensityLQResult = ee.FeatureCollection(boroughDensityJoined)
  .filter(ee.Filter.notNull(['density_stats']))
  .map(function(f) {

    var stats = ee.Feature(f.get('density_stats'));

    return f.set({
      borough_pop: stats.get('borough_pop'),
      borough_area_km2: stats.get('borough_area_km2'),
      borough_density: stats.get('borough_density'),
      density_LQ: stats.get('density_LQ'),
      mean_density_LQ: stats.get('density_LQ')
    });
  });

print('Borough population density LQ:');




// --------------------------------------------------------------------------
// 3.3 Land Surface Temperature and Urban Heat Island indicators
// --------------------------------------------------------------------------
//
// This section uses Landsat 8/9 Collection 2 Level 2 data for May–September
// 2022. Thermal band ST_B10 is converted to Celsius. A UHI threshold is then
// defined as London mean LST plus 0.5 standard deviations.

// Time period
var lstStartDate = '2022-05-01';
var lstEndDate = '2022-10-01';


// Landsat 8/9 Collection 2 Level 2
var landsat8 = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
  .filterBounds(boroughs)
  .filterDate(lstStartDate, lstEndDate)
  .filter(ee.Filter.lt('CLOUD_COVER', 20));

var landsat9 = ee.ImageCollection('LANDSAT/LC09/C02/T1_L2')
  .filterBounds(boroughs)
  .filterDate(lstStartDate, lstEndDate)
  .filter(ee.Filter.lt('CLOUD_COVER', 20));

var landsat = landsat8.merge(landsat9);

print('Landsat 8 count:');
print('Landsat 9 count:');
print('Merged Landsat count:');


// Cloud mask and LST conversion
function maskAndConvertLST(image) {

  var qa = image.select('QA_PIXEL');

  var clearMask = qa.bitwiseAnd(1 << 0).eq(0)
    .and(qa.bitwiseAnd(1 << 1).eq(0))
    .and(qa.bitwiseAnd(1 << 2).eq(0))
    .and(qa.bitwiseAnd(1 << 3).eq(0))
    .and(qa.bitwiseAnd(1 << 4).eq(0))
    .and(qa.bitwiseAnd(1 << 5).eq(0));

  var lstC = image.select('ST_B10')
    .multiply(0.00341802)
    .add(149.0)
    .subtract(273.15)
    .rename('LST_C');

  return image
    .addBands(lstC)
    .updateMask(clearMask)
    .copyProperties(image, ['system:time_start']);
}

var lstCollection = landsat
  .map(maskAndConvertLST)
  .select('LST_C');


// Mean summer LST
var lstMean2022 = lstCollection
  .mean()
  .clip(boroughs)
  .rename('LST_C');

var lstVis = {
  min: 15,
  max: 45,
  palette: [
    '#313695',
    '#74add1',
    '#e0f3f8',
    '#ffffbf',
    '#fdae61',
    '#d73027'
  ]
};


// Borough-level LST statistics
var boroughLST = lstMean2022.reduceRegions({
  collection: boroughs,
  reducer: ee.Reducer.mean()
    .combine(ee.Reducer.min(), '', true)
    .combine(ee.Reducer.max(), '', true)
    .combine(ee.Reducer.stdDev(), '', true),
  scale: 30,
  crs: 'EPSG:4326'
});

print('Borough-level LST statistics:');


// UHI threshold
var lstStats = lstMean2022.reduceRegion({
  reducer: ee.Reducer.mean().combine({
    reducer2: ee.Reducer.stdDev(),
    sharedInputs: true
  }),
  geometry: boroughs.geometry(),
  scale: 30,
  maxPixels: 1e13
});

var meanLST = ee.Number(lstStats.get('LST_C_mean'));
var stdLST = ee.Number(lstStats.get('LST_C_stdDev'));
var uhiThreshold = meanLST.add(stdLST.multiply(0.5));

print('London-wide LST mean and stdDev:');
print('UHI threshold:');


// UHI binary image
var uhiMap = lstMean2022
  .gte(uhiThreshold)
  .rename('UHI');


// Borough-level UHI proportion
var uhiBinary = uhiMap
  .unmask(0)
  .rename('UHI');

var boroughUHI = uhiBinary.reduceRegions({
  collection: boroughs,
  reducer: ee.Reducer.mean(),
  scale: 30,
  crs: 'EPSG:4326'
});

var boroughUHIResult = boroughUHI.map(function(f) {
  return f.set({
    UHI_proportion: f.get('mean')
  });
});

print('Borough-level UHI proportion:');


// --------------------------------------------------------------------------
// 3.4 Green cover indicator
// --------------------------------------------------------------------------
//
// This section extracts green land-cover classes from ESA WorldCover and
// calculates the percentage of each borough classified as green cover.

// ESA WorldCover 2020
var worldCover = ee.ImageCollection('ESA/WorldCover/v200')
  .first()
  .select('Map')
  .clip(boroughs);


// Extract green cover classes
// 10 = Tree cover
// 20 = Shrubland
// 30 = Grassland
// 40 = Cropland
var greenCover = worldCover.eq(10)
  .or(worldCover.eq(20))
  .or(worldCover.eq(30))
  .or(worldCover.eq(40))
  .rename('green_cover');


// Borough-level green cover statistics
var boroughGreenStats = greenCover.reduceRegions({
  collection: boroughs,
  reducer: ee.Reducer.mean(),
  scale: 10
});

var boroughGreenResult = boroughGreenStats.map(function(f) {

  var greenPct = ee.Number(f.get('mean')).multiply(100);
  var lackGreenPct = ee.Number(100).subtract(greenPct);

  return f.set({
    green_pct: greenPct,
    lack_green_pct: lackGreenPct
  });
});

print('Borough green cover result:');


// --------------------------------------------------------------------------
// 3.5 Mean summer NDVI
// --------------------------------------------------------------------------
// This section calculates NDVI from Landsat 8/9 surface reflectance bands for
// the same summer period as LST, then summarises mean NDVI by borough.

// Time period
var ndviStartDate = '2022-05-01';
var ndviEndDate = '2022-10-01';


// Landsat 8/9
var ndviLandsat8 = ee.ImageCollection('LANDSAT/LC08/C02/T1_L2')
  .filterBounds(boroughs)
  .filterDate(ndviStartDate, ndviEndDate)
  .filter(ee.Filter.lt('CLOUD_COVER', 20));

var ndviLandsat9 = ee.ImageCollection('LANDSAT/LC09/C02/T1_L2')
  .filterBounds(boroughs)
  .filterDate(ndviStartDate, ndviEndDate)
  .filter(ee.Filter.lt('CLOUD_COVER', 20));

var ndviLandsat = ndviLandsat8.merge(ndviLandsat9);

print('NDVI Landsat count:');


// Cloud mask
function maskLandsatCloudsNDVI(image) {

  var qa = image.select('QA_PIXEL');

  var clearMask = qa.bitwiseAnd(1 << 0).eq(0)
    .and(qa.bitwiseAnd(1 << 1).eq(0))
    .and(qa.bitwiseAnd(1 << 2).eq(0))
    .and(qa.bitwiseAnd(1 << 3).eq(0))
    .and(qa.bitwiseAnd(1 << 4).eq(0))
    .and(qa.bitwiseAnd(1 << 5).eq(0));

  return image
    .updateMask(clearMask)
    .copyProperties(image, ['system:time_start']);
}


// NDVI calculation
function addNDVI(image) {

  var nir = image.select('SR_B5')
    .multiply(0.0000275)
    .add(-0.2);

  var red = image.select('SR_B4')
    .multiply(0.0000275)
    .add(-0.2);

  var ndvi = nir.subtract(red)
    .divide(nir.add(red))
    .rename('NDVI');

  return image.addBands(ndvi);
}


// Mean summer NDVI
var ndviMean2022 = ndviLandsat
  .map(maskLandsatCloudsNDVI)
  .map(addNDVI)
  .select('NDVI')
  .mean()
  .clip(boroughs);


// Borough-level NDVI
var boroughNDVI = ndviMean2022.reduceRegions({
  collection: boroughs,
  reducer: ee.Reducer.mean(),
  scale: 30
});

var boroughNDVIResult = boroughNDVI.map(function(f) {
  return f.set({
    mean_NDVI: f.get('mean')
  });
});

print('Borough mean NDVI:');



// --------------------------------------------------------------------------
// 3.6 Heat Risk Index image layer
// --------------------------------------------------------------------------
//
// The borough-level HRI table has already been joined to the borough boundary
// layer in Section 2.6. This section converts the HRI attribute to an image for
// map visualisation.
//  CONVERT HRI TO IMAGE

var hriImage = hriBoroughs.reduceToImage({
  properties: ['HRI'],
  reducer: ee.Reducer.first()
}).clip(boroughs);

var hriVis = {
  min: 3,
  max: 15,
  palette: [
    '#fef0d9',
    '#fdd49e',
    '#fc8d59',
    '#d7301f',
    '#7f0000'
  ]
};


// ============================================================================
// Section 4: Prepare Borough Dashboard Dataset
// ============================================================================

// Clear all previous layers
Map.layers().reset();


// --------------------------------------------------------------------------
// 4.1 Helper functions for borough-level joins
// --------------------------------------------------------------------------

// Join a secondary FeatureCollection to a primary FeatureCollection by borough code
function joinByBoroughCode(primary, secondary, matchName) {
  var join = ee.Join.saveFirst(matchName);

  var filter = ee.Filter.equals({
    leftField: 'LAD22CD',
    rightField: 'LAD22CD'
  });

  return ee.FeatureCollection(join.apply({
    primary: primary,
    secondary: secondary,
    condition: filter
  }));
}


// Safely extract property from a joined feature.
// If the joined object is missing, use an empty feature instead of crashing.
function getJoinedValue(feature, matchName, propertyName) {
  var emptyFeature = ee.Feature(null);

  var matchedFeature = ee.Feature(
    ee.Algorithms.If(
      feature.get(matchName),
      feature.get(matchName),
      emptyFeature
    )
  );

  return matchedFeature.get(propertyName);
}

// --------------------------------------------------------------------------
// 4.2 Join all borough-level indicator tables
// --------------------------------------------------------------------------

var dashboardJoined = boroughs;

dashboardJoined = joinByBoroughCode(
  dashboardJoined,
  boroughDensityLQResult,
  'density_match'
);

dashboardJoined = joinByBoroughCode(
  dashboardJoined,
  boroughLST,
  'lst_match'
);

dashboardJoined = joinByBoroughCode(
  dashboardJoined,
  boroughUHIResult,
  'uhi_match'
);

dashboardJoined = joinByBoroughCode(
  dashboardJoined,
  boroughGreenResult,
  'green_match'
);

dashboardJoined = joinByBoroughCode(
  dashboardJoined,
  boroughNDVIResult,
  'ndvi_match'
);

dashboardJoined = joinByBoroughCode(
  dashboardJoined,
  hriBoroughs,
  'hri_match'
);


// --------------------------------------------------------------------------
// 4.3 Create final borough dashboard FeatureCollection
// --------------------------------------------------------------------------

var boroughDashboardData = dashboardJoined.map(function(f) {

  return f.set({

  // Population
  borough_pop: getJoinedValue(f, 'density_match', 'borough_pop'),
  mean_density_LQ: getJoinedValue(f, 'density_match', 'mean_density_LQ'),

    // Heat
    mean_LST: getJoinedValue(f, 'lst_match', 'mean'),
    min_LST: getJoinedValue(f, 'lst_match', 'min'),
    max_LST: getJoinedValue(f, 'lst_match', 'max'),
    std_LST: getJoinedValue(f, 'lst_match', 'stdDev'),

    // UHI
    UHI_proportion: getJoinedValue(f, 'uhi_match', 'UHI_proportion'),

    // Heat Risk Index
    HRI: getJoinedValue(f, 'hri_match', 'HRI'),

    // Green / vegetation
    green_pct: getJoinedValue(f, 'green_match', 'green_pct'),
    lack_green_pct: getJoinedValue(f, 'green_match', 'lack_green_pct'),
    mean_NDVI: getJoinedValue(f, 'ndvi_match', 'mean_NDVI')
  });
});

print('Final borough dashboard data:', boroughDashboardData.first());


// --------------------------------------------------------------------------
// 4.4 Convert dashboard data to a lightweight client-side table
// --------------------------------------------------------------------------

// LOAD DASHBOARD TABLE TO CLIENT
var dashboardDataByName = {};
var boroughSelect = null;

var dashboardTable = boroughDashboardData.map(function(f) {
  return ee.Feature(null, {
    LAD22CD: f.get('LAD22CD'),
    LAD22NM: f.get('LAD22NM'),
    borough_pop: f.get('borough_pop'),
    mean_density_LQ: f.get('mean_density_LQ'),
    mean_LST: f.get('mean_LST'),
    min_LST: f.get('min_LST'),
    max_LST: f.get('max_LST'),
    std_LST: f.get('std_LST'),
    UHI_proportion: f.get('UHI_proportion'),
    HRI: f.get('HRI'),
    green_pct: f.get('green_pct'),
    lack_green_pct: f.get('lack_green_pct'),
    mean_NDVI: f.get('mean_NDVI')
  });
});


// ============================================================================
// Section 5: Main Map Layer Management
// ============================================================================

// --------------------------------------------------------------------------
// 5.1 Create main map layers
// --------------------------------------------------------------------------

var selectedBoroughLayer = ui.Map.Layer(
  ee.Image().selfMask(),
  {},
  translate('Selected Borough')
);
selectedBoroughLayer.untranslatedName = 'Selected Borough';

var meanLSTLayer = ui.Map.Layer(
  lstMean2022,
  lstVis,
  translate('Mean LST May-Sep 2022')
);
meanLSTLayer.untranslatedName = 'Mean LST May-Sep 2022';

var uhiPixelsLayer = ui.Map.Layer(
  uhiMap.selfMask(),
  { palette: ['red'] },
  translate('UHI pixels')
);
uhiPixelsLayer.untranslatedName = 'UHI pixels';

var greenCoverLayer = ui.Map.Layer(
  greenCover.selfMask(),
  { palette: ['1f6f50'] },
  translate('Green cover')
);
greenCoverLayer.untranslatedName = 'Green cover';

meanNDVILayer = ui.Map.Layer(
  ndviMean2022,
  {
    min: 0,
    max: 0.8,
    palette: ['#ffffff', '#ffffcc', '#c2e699', '#006837']
  },
  translate('Mean NDVI May-Sep 2022'),
  false
);
meanNDVILayer.untranslatedName = 'Mean NDVI May-Sep 2022';

var hriLayer = ui.Map.Layer(
  hriImage,
  hriVis,
  translate('London HRI')
);
hriLayer.untranslatedName = 'London HRI';

// --------------------------------------------------------------------------
// 5.2 Add layers to the main map
// --------------------------------------------------------------------------

Map.layers().reset();

Map.layers().add(meanLSTLayer);
Map.layers().add(uhiPixelsLayer);
Map.layers().add(greenCoverLayer);
Map.layers().add(meanNDVILayer);
Map.layers().add(hriLayer);

// Combined selected borough mask:
// outside London = light grey
// unselected London = dark grey
// selected borough outline = red
Map.layers().add(selectedBoroughLayer);


// --------------------------------------------------------------------------
// 5.3 Configure map controls and basemap
// --------------------------------------------------------------------------

Map.centerObject(boroughs, 10);

// Keep the default Google Earth Engine layer list visible.
Map.setControlVisibility({
  layerList: true
});

// Greyscale basemap, closer to the sample visual style
var greyBasemap = [
  {
    stylers: [
      {saturation: -100},
      {lightness: 20}
    ]
  },
  {
    featureType: 'poi',
    stylers: [
      {visibility: 'off'}
    ]
  }
];

Map.setOptions('Greyscale', {
  'Greyscale': greyBasemap
});


// ============================================================================
// Section 6: Split Comparison View
// ============================================================================

// --------------------------------------------------------------------------
// 6.1 Split view state variables
// --------------------------------------------------------------------------

var splitPanelWidget = null;
var splitLeftMap = null;
var splitRightMap = null;

var splitLeftLayer = null;
var splitRightLayer = null;

var splitLeftTitle = null;
var splitRightTitle = null;

var splitLeftSelect = null;
var splitRightSelect = null;

var isSplitViewActive = false;


// --------------------------------------------------------------------------
// 6.2 Define available comparison layers
// --------------------------------------------------------------------------

function getComparisonLayerDictionary() {
  return {
    'Mean LST May-Sep 2022': {
      image: lstMean2022,
      vis: lstVis,
      label: translate('Mean LST May-Sep 2022')
    },

    'UHI pixels': {
      image: uhiMap.selfMask(),
      vis: { palette: ['red'] },
      label: translate('UHI pixels')
    },

    'Green cover': {
      image: greenCover.selfMask(),
      vis: { palette: ['1f6f50'] },
      label: translate('Green cover')
    },

    'Mean NDVI May-Sep 2022': {
      image: ndviMean2022,
      vis: {
        min: 0,
        max: 0.8,
        palette: ['#ffffff', '#ffffcc', '#c2e699', '#006837']
      },
      label: translate('Mean NDVI May-Sep 2022')
    },

    'London HRI': {
      image: hriImage,
      vis: hriVis,
      label: translate('London HRI')
    },

    'Population Density LQ': {
      image: lsoaLQImage,
      vis: lsoaLQVis,
      label: translate('Population Density LQ')
    }
  };
}

// --------------------------------------------------------------------------
// 6.3 Split view UI controls
// --------------------------------------------------------------------------

function createSplitTitleLabel(text, position) {
  return ui.Label({
    value: text,
    style: {
      position: position,
      fontSize: '14px',
      fontWeight: 'bold',
      color: '#111827',
      backgroundColor: 'rgba(255,255,255,0.90)',
      padding: '6px',
      margin: '8px',
      border: '1px solid #d1d5db'
    }
  });
}

function createSplitControlPanel() {

  var layerNames = Object.keys(getComparisonLayerDictionary());

  var layerItems = layerNames.map(function(name) {
    return {
      label: translate(name),
      value: name
    };
  });

  splitLeftSelect = ui.Select({
    items: layerItems,
    value: 'Mean LST May-Sep 2022',
    style: {
      width: '210px',
      margin: '4px 8px 4px 0'
    },
    onChange: function(value) {
      updateSplitMapLayer('left', value);
    }
  });

  splitRightSelect = ui.Select({
    items: layerItems,
    value: 'London HRI',
    style: {
      width: '210px',
      margin: '4px 0 4px 0'
    },
    onChange: function(value) {
      updateSplitMapLayer('right', value);
    }
  });

  var backButton = ui.Button({
    label: translate('Back to Dashboard'),
    onClick: function() {
      showDashboardMapView();
      selectedBoroughName = null;

      if (boroughSelect) {
        boroughSelect.setValue(null, false);
      }

      showInitialMessage();
    },
    style: {
      width: '160px',
      margin: '4px 0 4px 12px'
    }
  });

  return ui.Panel({
    widgets: [
      ui.Label(translate('Split Comparison View'), {
        fontSize: '14px',
        fontWeight: 'bold',
        color: '#111827',
        margin: '6px 12px 4px 0'
      }),

      ui.Label(translate('Left map layer'), {
        fontSize: '11px',
        color: '#4b5563',
        margin: '9px 4px 0 0'
      }),

      splitLeftSelect,

      ui.Label(translate('Right map layer'), {
        fontSize: '11px',
        color: '#4b5563',
        margin: '9px 4px 0 8px'
      }),

      splitRightSelect,

      backButton
    ],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {
      position: 'top-center',
      padding: '6px',
      backgroundColor: 'rgba(255,255,255,0.94)',
      border: '1px solid #d1d5db',
      margin: '8px'
    }
  });
}

// --------------------------------------------------------------------------
// 6.4 Split view map update functions
// --------------------------------------------------------------------------

function updateSplitMapLayer(side, layerName) {

  var layerDict = getComparisonLayerDictionary();
  var layerInfo = layerDict[layerName];

  if (!layerInfo) {
    return;
  }

  if (side === 'left') {
    splitLeftLayer.setEeObject(layerInfo.image);
    splitLeftLayer.setVisParams(layerInfo.vis);
    splitLeftLayer.setName(layerInfo.label);

    if (splitLeftTitle) {
      splitLeftTitle.setValue(layerInfo.label);
    }
  }

  if (side === 'right') {
    splitRightLayer.setEeObject(layerInfo.image);
    splitRightLayer.setVisParams(layerInfo.vis);
    splitRightLayer.setName(layerInfo.label);

    if (splitRightTitle) {
      splitRightTitle.setValue(layerInfo.label);
    }
  }
}

function resetSplitMapsToLondon() {
  if (splitLeftMap) {
    splitLeftMap.centerObject(boroughs, 10);
  }

  if (splitRightMap) {
    splitRightMap.centerObject(boroughs, 10);
  }
}

function handleSplitMapClick(coords) {

  var point = ee.Geometry.Point([coords.lon, coords.lat]);

  london.geometry().contains(point).evaluate(function(isInsideLondon) {

    if (!isInsideLondon) {
      resetSplitMapsToLondon();
      return;
    }

    var clickedBorough = boroughs
      .filterBounds(point)
      .first();

    clickedBorough.evaluate(function(f) {

      if (!f) {
        resetSplitMapsToLondon();
        return;
      }

      var boroughName = f.properties.LAD22NM;

      // Switch back from split comparison view to the main dashboard map
      showDashboardMapView();

      // Update dropdown value without triggering duplicate onChange
      if (boroughSelect) {
        boroughSelect.setValue(boroughName, false);
      }

      // Open the selected borough view
      selectBorough(boroughName);
    });
  });
}

// --------------------------------------------------------------------------
// 6.5 Build split comparison view
// --------------------------------------------------------------------------

function createSplitComparisonView() {

  splitLeftMap = ui.Map();
  splitRightMap = ui.Map();

  splitLeftMap.setOptions('Greyscale', {
    'Greyscale': greyBasemap
  });

  splitRightMap.setOptions('Greyscale', {
    'Greyscale': greyBasemap
  });

  var layerDict = getComparisonLayerDictionary();

  splitLeftLayer = ui.Map.Layer(
    layerDict['Mean LST May-Sep 2022'].image,
    layerDict['Mean LST May-Sep 2022'].vis,
    layerDict['Mean LST May-Sep 2022'].label
  );

  splitRightLayer = ui.Map.Layer(
    layerDict['London HRI'].image,
    layerDict['London HRI'].vis,
    layerDict['London HRI'].label
  );

  splitLeftMap.layers().add(splitLeftLayer);
  splitRightMap.layers().add(splitRightLayer);

  var boroughBoundaryStyle = {
    color: '#111827',
    width: 1,
    fillColor: '#00000000'
  };

  splitLeftMap.layers().add(ui.Map.Layer(
    boroughs.style(boroughBoundaryStyle),
    {},
    translate('Borough boundaries')
  ));

  splitRightMap.layers().add(ui.Map.Layer(
    boroughs.style(boroughBoundaryStyle),
    {},
    translate('Borough boundaries')
  ));

  splitLeftTitle = createSplitTitleLabel(
    layerDict['Mean LST May-Sep 2022'].label,
    'top-left'
  );

  splitRightTitle = createSplitTitleLabel(
    layerDict['London HRI'].label,
    'top-right'
  );

  splitLeftMap.add(splitLeftTitle);
  splitRightMap.add(splitRightTitle);

  splitLeftMap.add(createSplitControlPanel());

  splitLeftMap.centerObject(boroughs, 10);
  splitRightMap.centerObject(boroughs, 10);
  
  splitLeftMap.onClick(handleSplitMapClick);
 splitRightMap.onClick(handleSplitMapClick);
  

  splitLeftMap.setControlVisibility({
    layerList: true,
    zoomControl: true,
    scaleControl: true,
    mapTypeControl: false
  });

  splitRightMap.setControlVisibility({
    layerList: true,
    zoomControl: true,
    scaleControl: true,
    mapTypeControl: false
  });

  var splitMapLinker = ui.Map.Linker([
    splitLeftMap,
    splitRightMap
  ]);

  splitPanelWidget = ui.SplitPanel({
    firstPanel: splitLeftMap,
    secondPanel: splitRightMap,
    orientation: 'horizontal',
    wipe: true,
    style: {
      stretch: 'both'
    }
  });

  return splitPanelWidget;
}


// ============================================================================
// Section 7: Dashboard UI Layout and Static Components
// ============================================================================

// --------------------------------------------------------------------------
// 7.1 General UI helper functions
// --------------------------------------------------------------------------
function createDividerPanel() {
  return ui.Panel({
    style: {
      height: '1px',
      backgroundColor: UI_STYLE.border,
      margin: '10px 0'
    }
  });
}

function createSmallDescription(text) {
  return ui.Label(text, {
    fontSize: '11px',
    color: UI_STYLE.muted,
    margin: '0 0 6px 0'
  });
}

function formatValue(value, digits) {
  if (value === null || value === undefined || isNaN(Number(value))) {
    return 'N/A';
  }
  return Number(value).toFixed(digits);
}

function formatPopulation(value) {
  if (value === null || value === undefined || isNaN(Number(value))) {
    return 'N/A';
  }

  return Math.round(Number(value)).toLocaleString();
}

function percentValue(value, digits) {
  if (value === null || value === undefined || isNaN(Number(value))) {
    return 'N/A';
  }
  return (Number(value) * 100).toFixed(digits);
}

function getHriRiskLevel(hri) {
  hri = Number(hri);

  if (isNaN(hri)) {
    return 'N/A';
  }

  if (hri <= 5.4) {
    return translate('Very Low Risk');
  } else if (hri <= 7.8) {
    return translate('Low Risk');
  } else if (hri <= 10.2) {
    return translate('Medium Risk');
  } else if (hri <= 12.6) {
    return translate('High Risk');
  } else {
    return translate('Very High Risk');
  }
}

// --------------------------------------------------------------------------
// 7.2 Loading message functions
// --------------------------------------------------------------------------

function showLoadingMessage(message) {
  hideLoadingMessage();

  loadingPanel = ui.Panel({
    widgets: [
      ui.Label(message, {
        fontSize: '13px',
        fontWeight: 'bold',
        color: UI_STYLE.text,
        padding: '10px'
      })
    ],
    style: {
      position: 'top-center',
      backgroundColor: 'rgba(255,255,255,0.95)',
      border: '1px solid ' + UI_STYLE.border,
      margin: '260px 0 0 0'
    }
  });

  Map.add(loadingPanel);
}

function hideLoadingMessage() {
  if (loadingPanel) {
    Map.remove(loadingPanel);
    loadingPanel = null;
  }
}


// ==============================
// 7.3 LEFT DASHBOARD PANEL
// ==============================

var dashboardPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    width: '410px',
    padding: '14px',
    backgroundColor: STYLES.COLORS.PANEL_BG,
    border: '1px solid ' + STYLES.COLORS.DIVIDER,
    stretch: 'vertical'
  }
});

var brandLabel = ui.Label('☀ HeatSafe London', {
  fontSize: '14px',
  fontWeight: 'bold',
  color: '#dc2626',
  margin: '0 0 4px 0'
});

appTitleLabel = ui.Label(translate('London Heat & Green Space Dashboard'), {
  fontSize: '20px',
  fontWeight: 'bold',
  color: UI_STYLE.text,
  margin: '0 0 6px 0'
});

appSubtitleLabel = ui.Label(
  translate('Explore borough-level population density, heat exposure, green cover and vegetation indicators.'),
  {
    fontSize: '12px',
    color: UI_STYLE.muted,
    margin: '0 0 8px 0',
    shown: false
  }
);

dashboardPanel.add(brandLabel);
dashboardPanel.add(appTitleLabel);
dashboardPanel.add(appSubtitleLabel);

dashboardPanel.add(createDividerPanel());

var selectPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: { margin: '4px 0 8px 0' }
});

dashboardPanel.add(selectPanel);

var statisticsPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    padding: '10px',
    backgroundColor: UI_STYLE.lightBg,
    border: '1px solid ' + UI_STYLE.border,
    margin: '8px 0 0 0'
  }
});

dashboardPanel.add(statisticsPanel);


// ============================================================================
// 7.5 Root app layout
// ============================================================================

ui.root.clear();

// Right-side container.
// We only change the widgets inside this panel.
// Do not rebuild the outer ui.SplitPanel repeatedly.
var rightMapContainer = ui.Panel({
  widgets: [Map],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    stretch: 'both',
    padding: '0px',
    margin: '0px'
  }
});

var appSplitPanel = ui.SplitPanel({
  firstPanel: dashboardPanel,
  secondPanel: rightMapContainer,
  orientation: 'horizontal',
  wipe: false,
  style: {
    stretch: 'both'
  }
});

ui.root.add(appSplitPanel);


// ============================================================================
// 7.6 View-switching functions
// ============================================================================


function showDashboardMapView() {

  isSplitViewActive = false;

  rightMapContainer.clear();
  rightMapContainer.add(Map);

  Map.centerObject(boroughs, 10);
}


function showSplitMapView() {

  isSplitViewActive = true;

  var splitComparisonContainer = ui.Panel({
    widgets: [
      createSplitComparisonView()
    ],
    layout: ui.Panel.Layout.flow('vertical'),
    style: {
      stretch: 'both',
      padding: '0px',
      margin: '0px'
    }
  });

  rightMapContainer.clear();
  rightMapContainer.add(splitComparisonContainer);
}

// Map.add(dashboardPanel);


// ============================================================================
// Section 8: Statistics Panel Rendering


// ============================================================================
// 8.1 Statistic card helpers
// ============================================================================

function createSectionTitle(title) {
  return ui.Label(title, {
    fontSize: '14px',
    fontWeight: 'bold',
    color: UI_STYLE.text,
    margin: '8px 0 5px 0'
  });
}

function createIndicatorCard(title, value, unit, description, valueColor, borderColor) {

  valueColor = valueColor || UI_STYLE.text;
  borderColor = borderColor || UI_STYLE.border;

  return ui.Panel({
    widgets: [
      ui.Label(title, {
        fontSize: '12px',
        fontWeight: 'bold',
        color: UI_STYLE.muted,
        margin: '0 0 3px 0'
      }),

      ui.Label(value + unit, {
        fontSize: '20px',
        fontWeight: 'bold',
        color: valueColor,
        margin: '0 0 3px 0'
      }),

      ui.Label(description, {
        fontSize: '10px',
        color: UI_STYLE.muted,
        margin: '0'
      })
    ],
    layout: ui.Panel.Layout.flow('vertical'),
    style: {
      backgroundColor: '#ffffff',
      border: '1px solid ' + borderColor,
      padding: '9px',
      margin: '5px 0'
    }
  });
}

// ==============================
// 8.2 Overview calculation helpers
// ==============================

function getDashboardArray() {
  return Object.keys(dashboardDataByName).map(function(name) {
    return dashboardDataByName[name];
  });
}

function meanOfProperty(arr, propertyName) {
  var values = arr
    .map(function(p) {
      return Number(p[propertyName]);
    })
    .filter(function(v) {
      return !isNaN(v);
    });

  if (values.length === 0) {
    return null;
  }

  var total = values.reduce(function(a, b) {
    return a + b;
  }, 0);

  return total / values.length;
}

function calculateOverviewStats() {
  var arr = getDashboardArray();

  var hriCounts = {
    veryLow: 0,
    low: 0,
    medium: 0,
    high: 0,
    veryHigh: 0
  };

  arr.forEach(function(p) {
    var hri = Number(p.HRI);

    if (isNaN(hri)) {
      return;
    }

    if (hri <= 5.4) {
      hriCounts.veryLow += 1;
    } else if (hri <= 7.8) {
      hriCounts.low += 1;
    } else if (hri <= 10.2) {
      hriCounts.medium += 1;
    } else if (hri <= 12.6) {
      hriCounts.high += 1;
    } else {
      hriCounts.veryHigh += 1;
    }
  });

  var topHRI = arr
    .filter(function(p) {
      return !isNaN(Number(p.HRI));
    })
    .sort(function(a, b) {
      return Number(b.HRI) - Number(a.HRI);
    })
    .slice(0, 5);

  return {
    meanLST: meanOfProperty(arr, 'mean_LST'),
    meanUHI: meanOfProperty(arr, 'UHI_proportion'),
    meanGreen: meanOfProperty(arr, 'green_pct'),
    meanHRI: meanOfProperty(arr, 'HRI'),
    hriCounts: hriCounts,
    topHRI: topHRI
  };
}

// ==============================
// 8.3 Overview panel components
// ==============================

function createOverviewCard(title, value, unit) {
  return ui.Panel({
    widgets: [
      ui.Label(title, {
        fontSize: '12px',
        fontWeight: 'bold',
        color: '#1f2937',
        margin: '0 0 12px 0',
        textAlign: 'center',
        stretch: 'horizontal',
        backgroundColor: '#00000000'
      }),

      ui.Panel({
        style: {
          height: '1px',
          backgroundColor: '#cbd5e1',
          margin: '0 0 12px 0',
          stretch: 'horizontal'
        }
      }),

      ui.Label(value + unit, {
        fontSize: '20px',
        fontWeight: 'bold',
        color: '#475569',
        margin: '0',
        textAlign: 'center',
        stretch: 'horizontal',
        backgroundColor: '#00000000'
      })
    ],
    layout: ui.Panel.Layout.flow('vertical'),
    style: {
      width: '165px',
      height: '118px',
      backgroundColor: '#f3f4f6',
      border: '1px solid #cbd5e1',
      padding: '14px 10px',
      margin: '6px'
    }
  });
}

function createOverviewCardRow(card1, card2) {
  return ui.Panel({
    widgets: [card1, card2],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {
      backgroundColor: '#00000000',
      margin: '0 0 2px 0',
      stretch: 'horizontal'
    }
  });
}

function createDistributionRow(color, label, count) {
  return ui.Panel({
    widgets: [
      ui.Label('', {
        backgroundColor: color,
        padding: '6px',
        margin: '3px 8px 3px 0',
        border: '1px solid #9ca3af'
      }),
      ui.Label(label + ': ' + count + ' ' + translate('boroughs'), {
        fontSize: '12px',
        color: UI_STYLE.text,
        margin: '2px 0'
      })
    ],
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {
      backgroundColor: '#00000000',
      margin: '1px 0'
    }
  });
}

function createTopHriRow(rank, p, maxHri) {
  var hri = Number(p.HRI);
  var barWidth = Math.max(20, Math.round((hri / maxHri) * 180));

  return ui.Panel({
    widgets: [
      ui.Label(rank + '. ' + p.LAD22NM, {
        fontSize: '12px',
        fontWeight: 'bold',
        color: UI_STYLE.text,
        margin: '0 0 2px 0'
      }),
      ui.Panel({
        widgets: [
          ui.Label('', {
            backgroundColor: '#b30000',
            width: barWidth + 'px',
            height: '8px',
            margin: '0'
          }),
          ui.Label(formatValue(hri, 2), {
            fontSize: '11px',
            color: UI_STYLE.muted,
            margin: '0 0 0 6px'
          })
        ],
        layout: ui.Panel.Layout.flow('horizontal'),
        style: {
          backgroundColor: '#00000000',
          margin: '0 0 5px 0'
        }
      })
    ],
    layout: ui.Panel.Layout.flow('vertical'),
    style: {
      backgroundColor: '#00000000',
      margin: '3px 0'
    }
  });
}

// ==============================
// 8.4 Split comparison button visibility
// ==============================

function updateSplitComparisonButtonVisibility() {

  if (!splitComparisonButton) {
    return;
  }

  if (selectedBoroughName) {
    splitComparisonButton.style().set('shown', false);
  } else {
    splitComparisonButton.style().set('shown', true);
  }
}

// ==============================
// 8.5 Render London overview
// ==============================

function showInitialMessage() {
  updateSplitComparisonButtonVisibility();
  
  statisticsPanel.clear();

  var arr = getDashboardArray();

  if (arr.length === 0) {
    statisticsPanel.add(ui.Label(translate('Loading borough dashboard data...'), {
      fontSize: '12px',
      color: UI_STYLE.muted
    }));
    return;
  }

  var overview = calculateOverviewStats();

  statisticsPanel.add(ui.Label(translate('London Overview'), {
    fontSize: '18px',
    fontWeight: 'bold',
    color: UI_STYLE.text,
    margin: '0 0 4px 0'
  }));

  statisticsPanel.add(ui.Label(translate('Borough-level summary indicators'), {
    fontSize: '11px',
    color: UI_STYLE.muted,
    margin: '0 0 8px 0'
  }));

  statisticsPanel.add(createDividerPanel());

  var lstCard = createOverviewCard(
  translate('Average LST'),
  formatValue(overview.meanLST, 2),
  ' °C'
);

var uhiCard = createOverviewCard(
  translate('Average UHI Proportion'),
  percentValue(overview.meanUHI, 2),
  ' %'
);

var greenCard = createOverviewCard(
  translate('Average Green Cover'),
  formatValue(overview.meanGreen, 2),
  ' %'
);

var hriCard = createOverviewCard(
  translate('Average HRI'),
  formatValue(overview.meanHRI, 2),
  ' / 15'
);

statisticsPanel.add(createOverviewCardRow(lstCard, uhiCard));
statisticsPanel.add(createOverviewCardRow(greenCard, hriCard));

  statisticsPanel.add(createDividerPanel());

  statisticsPanel.add(createSectionTitle(translate('Heat Risk Distribution')));

statisticsPanel.add(createDistributionRow(
  '#fef0d9',
  translate('Very Low Risk Boroughs'),
  overview.hriCounts.veryLow
));

statisticsPanel.add(createDistributionRow(
  '#fdd49e',
  translate('Low Risk Boroughs'),
  overview.hriCounts.low
));

statisticsPanel.add(createDistributionRow(
  '#fc8d59',
  translate('Medium Risk Boroughs'),
  overview.hriCounts.medium
));

statisticsPanel.add(createDistributionRow(
  '#d7301f',
  translate('High Risk Boroughs'),
  overview.hriCounts.high
));

statisticsPanel.add(createDistributionRow(
  '#7f0000',
  translate('Very High Risk Boroughs'),
  overview.hriCounts.veryHigh
));

  statisticsPanel.add(createDividerPanel());

  statisticsPanel.add(createSectionTitle(translate('Top 5 Boroughs by HRI')));

  var maxHri = overview.topHRI.length > 0
    ? Number(overview.topHRI[0].HRI)
    : 15;

  overview.topHRI.forEach(function(p, index) {
    statisticsPanel.add(createTopHriRow(index + 1, p, maxHri));
  });

  statisticsPanel.add(createDividerPanel());

  statisticsPanel.add(ui.Label(translate('Overview instruction'), {
    fontSize: '11px',
    color: UI_STYLE.muted,
    margin: '4px 0 0 0'
  }));
}

// ==============================
// 8.6 Render selected borough dashboard
// ==============================


function updateStatisticsPanel(p) {

  statisticsPanel.clear();

  statisticsPanel.add(ui.Label(p.LAD22NM, {
    fontSize: '18px',
    fontWeight: 'bold',
    color: UI_STYLE.text,
    margin: '0 0 4px 0'
  }));

  statisticsPanel.add(ui.Label(translate('Borough-level summary indicators'), {
    fontSize: '11px',
    color: UI_STYLE.muted,
    margin: '0 0 8px 0'
  }));

  statisticsPanel.add(createDividerPanel());

  // ------------------------------
  // Population
  // ------------------------------
  statisticsPanel.add(createSectionTitle(translate('Population')));

  statisticsPanel.add(createIndicatorCard(
    translate('Total Population'),
    formatPopulation(p.borough_pop),
    '',
    translate('Based on 2021 Census population data.'),
    '#2563eb',
    '#bfdbfe'
  ));

  statisticsPanel.add(createIndicatorCard(
    translate('Population Density LQ'),
    formatValue(p.mean_density_LQ, 3),
    '',
    translate('Relative to the London average. Values above 1 indicate higher-than-average density.'),
    '#2563eb',
    '#bfdbfe'
  ));

  // ------------------------------
  // Heat Exposure
  // ------------------------------
  statisticsPanel.add(createSectionTitle(translate('Heat Exposure')));

  statisticsPanel.add(createIndicatorCard(
    translate('Mean Land Surface Temperature'),
    formatValue(p.mean_LST, 2),
    ' °C',
    translate('Average summer LST derived from Landsat 8/9.'),
    '#ea580c',
    '#fed7aa'
  ));

  statisticsPanel.add(createIndicatorCard(
    translate('UHI Proportion'),
    percentValue(p.UHI_proportion, 2),
    ' %',
    translate('Share of borough pixels above the UHI threshold.'),
    '#ea580c',
    '#fed7aa'
  ));

  // ------------------------------
  // Green Space & Vegetation
  // ------------------------------
  statisticsPanel.add(createSectionTitle(translate('Green Space & Vegetation')));

  statisticsPanel.add(createIndicatorCard(
    translate('Mean NDVI'),
    formatValue(p.mean_NDVI, 3),
    '',
    translate('Higher NDVI generally indicates denser vegetation.'),
    '#15803d',
    '#bbf7d0'
  ));

  statisticsPanel.add(createIndicatorCard(
    translate('Green Cover'),
    formatValue(p.green_pct, 2),
    ' %',
    translate('Share of borough area classified as green cover.'),
    '#15803d',
    '#bbf7d0'
  ));

  // ------------------------------
  // Integrated Heat Risk
  // ------------------------------
  statisticsPanel.add(createSectionTitle(translate('Integrated Heat Risk')));

  statisticsPanel.add(createIndicatorCard(
    translate('Heat Risk Index'),
    formatValue(p.HRI, 2),
    ' / 15',
    translate('Borough-level heat risk index.'),
    '#dc2626',
    '#fecaca'
  ));

  statisticsPanel.add(createIndicatorCard(
    translate('Risk Level'),
    getHriRiskLevel(p.HRI),
    '',
    translate('Heat risk classification based on the borough-level HRI score.'),
    '#dc2626',
    '#fecaca'
  ));
}

 // statisticsPanel.add(createIndicatorCard(
 //   translate('Lack of Green Cover'),
  //  formatValue(p.lack_green_pct, 2),
  //  ' %',
 //   translate('Higher values indicate lower green cover availability.')
//  ));


// ============================================================================
// Section 9: Popups, Reset and Borough Selection
// ============================================================================

// ============================================================================
// 9.1 Popup helpers
// ============================================================================
var boroughPopup = null;

function hideBoroughPopup() {
  if (boroughPopup) {
    Map.remove(boroughPopup);
    boroughPopup = null;
  }
}

function hideOutsideLondonPopup() {
  if (outsideLondonPopup) {
    Map.remove(outsideLondonPopup);
    outsideLondonPopup = null;
  }
}

// ==============================
// 9.2 Reset to London overview
// ==============================


function resetToLondonOverview() {

  showDashboardMapView();

  selectedBoroughName = null;
  updateSplitComparisonButtonVisibility();

  if (boroughSelect) {
    boroughSelect.setValue(null, false);
  }

  selectedBoroughLayer.setEeObject(ee.Image().selfMask());
  selectedBoroughLayer.setOpacity(1);

  meanLSTLayer.setEeObject(lstMean2022);
  uhiPixelsLayer.setEeObject(uhiMap.selfMask());
  greenCoverLayer.setEeObject(greenCover.selfMask());
  meanNDVILayer.setEeObject(ndviMean2022);
  hriLayer.setEeObject(hriImage);

  Map.centerObject(boroughs, 10);

  hideBoroughPopup();
  hideOutsideLondonPopup();

  showInitialMessage();
}

// ==============================
// 9.3 Outside London popup
// ==============================


function showOutsideLondonPopup() {
  hideOutsideLondonPopup();

  outsideLondonPopup = ui.Panel({
    widgets: [
      ui.Label(translate('Clicked outside London'), {
        fontSize: '15px',
        fontWeight: 'bold',
        color: UI_STYLE.text,
        margin: '0 0 6px 0'
      }),

      ui.Label(translate('Please select a point within Greater London.'), {
        fontSize: '12px',
        color: UI_STYLE.muted,
        margin: '0 0 10px 0'
      }),

ui.Button({
  label: translate('Reset to London Overview'),
  onClick: resetToLondonOverview,
  style: {
    width: '190px',
    margin: '4px auto 0 auto'
  }
})
    ],
    layout: ui.Panel.Layout.flow('vertical'),
    style: {
      position: 'top-center',
      width: '310px',
      padding: '14px',
      backgroundColor: 'rgba(255,255,255,0.96)',
      border: '1px solid #d1d5db',
      margin: '260px 0 0 0'
    }
  });

  Map.add(outsideLondonPopup);
}

// ==============================
// 9.4 Selected borough popup
// ==============================

function showBoroughPopup(p) {
  hideBoroughPopup();

  boroughPopup = ui.Panel({
    widgets: [
      ui.Label(p.LAD22NM, {
        fontSize: '14px',
        fontWeight: 'bold',
        margin: '0 0 4px 0'
      }),
      ui.Label(
        'LST: ' + formatValue(p.mean_LST, 2) + ' °C | ' +
        'UHI: ' + percentValue(p.UHI_proportion, 1) + '% | ' +
        'NDVI: ' + formatValue(p.mean_NDVI, 3),
        {
          fontSize: '11px',
          color: UI_STYLE.muted,
          margin: '0'
        }
      ),
      ui.Button({
  label: translate('Close'),
  onClick: hideBoroughPopup,
  style: {
    margin: '6px 0 0 0',
    stretch: 'horizontal'
  }
})
    ],
    layout: ui.Panel.Layout.flow('vertical'),
    style: {
      position: 'bottom-center',
      width: '320px',
      padding: '10px',
      backgroundColor: '#ffffff',
      border: '1px solid ' + UI_STYLE.border
    }
  });

  Map.add(boroughPopup);
}



// ==============================
// 9.5 Borough selection logic
// ==============================

function selectBorough(boroughName) {

  // If the user selects a borough while in split comparison view,
  // return to the main dashboard map first.
  if (isSplitViewActive) {
    showDashboardMapView();
  }

  selectedBoroughName = boroughName;
  updateSplitComparisonButtonVisibility();
  
  hideOutsideLondonPopup();

  showLoadingMessage(translate('Loading data for ') + boroughName + '...');
  var p = dashboardDataByName[boroughName];

  hideLoadingMessage();

  if (!p) {
    statisticsPanel.clear();
    statisticsPanel.add(ui.Label('No indicator data available for: ' + boroughName));
    return;
  }

  updateStatisticsPanel(p);
  showBoroughPopup(p);

  var selectedFeature = boroughs.filter(
    ee.Filter.eq('LAD22NM', boroughName)
  );

  var selectedGeometry = selectedFeature.geometry();

// ======================================================
// Combined selected borough layer
// 1 = outside London, light grey
// 2 = unselected London boroughs, dark grey
// 3 = selected borough outline, red
// ======================================================

var mapBounds = boroughs.geometry()
  .bounds()
  .buffer(50000)
  .bounds();

var outsideLondonMask = ee.Image.constant(1)
  .clip(mapBounds)
  .paint(boroughs, 0)
  .selfMask();

var unselectedLondonMask = ee.Image.constant(2)
  .clip(boroughs.geometry())
  .paint(selectedFeature, 0)
  .selfMask();

var selectedOutline = ee.Image()
  .byte()
  .paint(selectedFeature, 3, 3)
  .selfMask();

var combinedSelectedLayer = ee.ImageCollection([
  outsideLondonMask,
  unselectedLondonMask,
  selectedOutline
]).mosaic();

selectedBoroughLayer.setEeObject(combinedSelectedLayer);
selectedBoroughLayer.setVisParams({
  min: 1,
  max: 3,
  palette: [
    'bdbdbd',  // outside London
    '000000',  // unselected London
    'dc2626'   // selected borough outline
  ]
});
selectedBoroughLayer.setOpacity(0.72);



  // Clip all active raster layers to selected borough
  meanLSTLayer.setEeObject(lstMean2022.clip(selectedGeometry));
  uhiPixelsLayer.setEeObject(uhiMap.selfMask().clip(selectedGeometry));
  greenCoverLayer.setEeObject(greenCover.selfMask().clip(selectedGeometry));
  meanNDVILayer.setEeObject(ndviMean2022.clip(selectedGeometry));
  hriLayer.setEeObject(hriImage.clip(selectedGeometry));

  Map.centerObject(selectedFeature, 11);
}
// ============================================================================
// Section 10: Language and Control Panel Updates
// ============================================================================

// ==============================
// 10.1 Update app language
// ==============================
function updateLanguage(lang) {

  currentLanguage = lang;

  if (appTitleLabel) {
    appTitleLabel.setValue(translate('London Heat & Green Space Dashboard'));
  }

  if (appSubtitleLabel) {
    appSubtitleLabel.setValue(
      translate('Explore borough-level population density, heat exposure, green cover and vegetation indicators.')
    );
  }

  updateMapLayerNames();
  updateLegend();

  // Rebuild the left control panel with translated labels
  initialiseDropdown();

  // If split comparison view is currently open, rebuild it so that
  // split view titles, dropdown labels and buttons are translated too.
  if (isSplitViewActive) {
    showSplitMapView();
  }

  if (selectedBoroughName && dashboardDataByName[selectedBoroughName]) {
    var p = dashboardDataByName[selectedBoroughName];
    updateStatisticsPanel(p);

    if (boroughPopup) {
      showBoroughPopup(p);
    }
  } else {
    showInitialMessage();
  }
}

// ==============================
// 10.2 Initialise dropdown controls
// ==============================

function initialiseDropdown() {

  var names = Object.keys(dashboardDataByName).sort();

  selectPanel.clear();

  selectPanel.add(ui.Label(translate('Change Language'), {
    fontSize: '13px',
    fontWeight: 'bold',
    color: UI_STYLE.text,
    margin: '0 0 4px 0'
  }));

languageSelect = ui.Select({
  items: ['English', '中文', 'Türkçe'],
  value: currentLanguage,
  style: {
    width: '350px',
    margin: '6px 0 10px 0'
  },
  onChange: function(value) {
    if (value) {
      updateLanguage(value);
    }
  }
});

  selectPanel.add(languageSelect);

  selectPanel.add(ui.Label(translate('Select Borough'), {
    fontSize: '13px',
    fontWeight: 'bold',
    color: UI_STYLE.text,
    margin: '0 0 4px 0'
  }));

  boroughSelect = ui.Select({
    items: names,
    placeholder: translate('Select a borough'),
    value: selectedBoroughName,
    style: {
      width: '350px',
      margin: '6px 0'
    },
    onChange: function(value) {
      if (value) {
        selectBorough(value);
      }
    }
  });

  selectPanel.add(boroughSelect);

selectPanel.add(ui.Button({
  label: translate('Reset View'),
  onClick: resetToLondonOverview,
  style: {
    width: '350px',
    margin: '8px 0 0 0'
  }
}));

// ============================================================================
// Section 11: Map Click Interaction and App Initialisation
// ============================================================================

  selectPanel.add(createDividerPanel());

  selectPanel.add(ui.Label(translate('Map Display Mode'), {
    fontSize: '13px',
    fontWeight: 'bold',
    color: UI_STYLE.text,
    margin: '0 0 4px 0'
  }));

  ////selectPanel.add(createSmallDescription(
  ///  translate('Compare different heat and green space layers side by side.')
  ////));

  // Split comparison button
  // Only shown when no borough is selected
  splitComparisonButton = ui.Button({
    label: translate('Split Comparison View'),
    onClick: function() {
      selectedBoroughName = null;

      if (boroughSelect) {
        boroughSelect.setValue(null, false);
      }

      showInitialMessage();
      showSplitMapView();
    },
    style: {
      width: '350px',
      margin: '6px 0 0 0'
    }
  });

  selectPanel.add(splitComparisonButton);
  updateSplitComparisonButtonVisibility();

  if (selectedBoroughName && dashboardDataByName[selectedBoroughName]) {
    updateStatisticsPanel(dashboardDataByName[selectedBoroughName]);
  } else {
    showInitialMessage();
  }
}

// ==============================
// 11.1 Main map click interaction
// ==============================

Map.onClick(function(coords) {

  var point = ee.Geometry.Point([coords.lon, coords.lat]);

  london.geometry().contains(point).evaluate(function(isInsideLondon) {

    if (!isInsideLondon) {
      showOutsideLondonPopup();
      return;
    }

    hideOutsideLondonPopup();

    var clickedBorough = boroughs
      .filterBounds(point)
      .first();

    clickedBorough.evaluate(function(f) {

      if (!f) {
        showOutsideLondonPopup();
        return;
      }

      var boroughName = f.properties.LAD22NM;

      if (boroughSelect) {
        boroughSelect.setValue(boroughName, false);
      }

      selectBorough(boroughName);

    });

  });

});


// ==============================
// 11.2 Load dashboard data and initialise app
// ==============================

statisticsPanel.clear();

statisticsPanel.add(ui.Label(translate('Loading borough dashboard data...'), {
  fontSize: '12px',
  color: UI_STYLE.muted
}));

dashboardTable.evaluate(function(fc) {

  dashboardDataByName = {};

  if (!fc || !fc.features) {
    statisticsPanel.clear();
    statisticsPanel.add(
      ui.Label(translate('Failed to load borough dashboard data.'))
    );
    return;
  }

  fc.features.forEach(function(feature) {
    var p = feature.properties;

    if (p.LAD22NM) {
      dashboardDataByName[p.LAD22NM] = p;
    }
  });

  initialiseDropdown();

});
