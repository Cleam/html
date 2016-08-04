(function(){
	console.log('lizhigao');
}());

/**
 * 首页广告JS
 * 名称约定：
 *     li: 信息流每页第1个广告（包括下拉加载的新闻中的广告）
 *     li2： 信息流每页第2个广告
 *     li3： 信息流每页第3个广告
 * @deps global.js (此js依赖global.js)
 * @author  lizhigao(lizhigao@021.com)
 * @date 2016-06-03
 */
/* global GLOBAL:true */
/* global Cookies:true */
GLOBAL.namespace('Et');
// 广告联盟商（百度、搜狗、广点通）
GLOBAL.Et.channelArr = ['baidu', 'sogou', 'gdt'];
// 渠道-广告数据
GLOBAL.Et.ggData = {
    "root": {
        "junbo": {
            "baidu": {
                li: "u2714979",
                li2: "u2714984",
                li3: "u2714985"
            }
        },
        "junbo01": {
            "baidu": {
                li: "u2714990",
                li2: "u2714996",
                li3: "u2714997"
            }
        },
        "junboyule": {
            "baidu": {
                li: "u2715002",
                li2: "u2715007",
                li3: "u2715008"
            }
        },
        "kuhuasuoping01": {
            "baidu": {
                li: "u2714236",
                li2: "u2714242",
                li3: "u2714243"
            }
        },
        "zhangliu": {
            "baidu": {
                li: "u2713803",
                li2: "u2713811",
                li3: "u2713814"
            }
        },
        "1928cm": {
            "baidu": {
                li: "u2710912",
                li2: "u2713641",
                li3: "u2714797"
            }
        },
        "1234": {
            "baidu": {
                li: "u2710859",
                li2: "u2713639",
                li3: "u2714796"
            }
        },
        "5Gyingyong": {
            "baidu": {
                li: "u2710164",
                li2: "u2713636",
                li3: "u2714794"
            }
        },
        "6399": {
            "baidu": {
                li: "u2709122",
                li2: "u2713635",
                li3: "u2714792"
            }
        },
        "miaozhuan": {
            "baidu": {
                li: "u2709056",
                li2: "u2713634",
                li3: "u2714788"
            }
        },
        "baobeituan": {
            "baidu": {
                li: "u2708885",
                li2: "u2713633",
                li3: "u2714787"
            }
        },
        "aspgnews": {
            "baidu": {
                li: "u2708863",
                li2: "u2713630",
                li3: "u2714786"
            }
        },
        "zjxw": {
            "baidu": {
                li: "u2708876",
                li2: "u2713629",
                li3: "u2714785"
            }
        },
        "doudouqw": {
            "baidu": {
                li: "u2708713",
                li2: "u2713628",
                li3: "u2714781"
            }
        },
        "shandiansp": {
            "baidu": {
                li: "u2708618",
                li2: "u2713627",
                li3: "u2714779"
            }
        },
        "kulian": {
            "baidu": {
                li: "u2708180",
                li2: "u2713626",
                li3: "u2714778"
            }
        },
        "pgzsdx": {
            "baidu": {
                li: "u2708173",
                li2: "u2713624",
                li3: "u2714776"
            }
        },
        "yunzhumian": {
            "baidu": {
                li: "u2708166",
                li2: "u2713623",
                li3: "u2714775"
            }
        },
        "anquanzm": {
            "baidu": {
                li: "u2708046",
                li2: "u2713622",
                li3: "u2714774"
            }
        },
        "980so": {
            "baidu": {
                li: "u2708035",
                li2: "u2713620",
                li3: "u2714773"
            }
        },
        "sosowifi": {
            "baidu": {
                li: "u2591765",
                li2: "u2713619",
                li3: "u2714769"
            }
        },
        "ludashi": {
            "baidu": {
                li: "u2705137",
                li2: "u2713617",
                li3: "u2714768"
            }
        },
        "yueduxing": {
            "baidu": {
                li: "u2705032",
                li2: "u2713616",
                li3: "u2714767"
            }
        },
        "jiguang": {
            "baidu": {
                li: "u2683800",
                li2: "u2713615",
                li3: "u2714766"
            }
        },
        "zhuanqianbao": {
            "baidu": {
                li: "u2628207",
                li2: "u2713614",
                li3: "u2714764"
            }
        },
        "m021_yumi": {
            "baidu": {
                li: "u2702698",
                li2: "u2713613",
                li3: "u2714763"
            }
        },
        "rilih5": {
            "baidu": {
                li: "u2703874",
                li2: "u2713612",
                li3: "u2714761"
            }
        },
        "waliwifi01": {
            "baidu": {
                li: "u2700423",
                li2: "u2713611",
                li3: "u2714760"
            }
        },
        "haitunllq": {
            "baidu": {
                li: "u2700139",
                li2: "u2713609",
                li3: "u2714759"
            }
        },
        "kds": {
            "baidu": {
                li: "u2701834",
                li2: "u2713608",
                li3: "u2714757"
            }
        },
        "pxt": {
            "baidu": {
                li: "u2701826",
                li2: "u2713606",
                li3: "u2714756"
            }
        },
        "gsbrowser_wifi": {
            "baidu": {
                li: "u2701268",
                li2: "u2713605",
                li3: "u2714755"
            }
        },
        "weimipush": {
            "sogou": {
                li: "571749",
                li2: "571749",
                li3: "571749"
            }
        },
        "haitun": {
            "baidu": {
                li: "u2697286",
                li2: "u2713602",
                li3: "u2714753"
            }
        },
        "liuliangzt": {
            "baidu": {
                li: "u2696954",
                li2: "u2713601",
                li3: "u2714751"
            }
        },
        "aliyun": {
            "baidu": {
                li: "u2696794",
                li2: "u2713600",
                li3: "u2714748"
            }
        },
        "waliwifi": {
            "baidu": {
                li: "u2695916",
                li2: "u2713598",
                li3: "u2714747"
            }
        },
        "xunfei": {
            "baidu": {
                li: "u2695582",
                li2: "u2713596",
                li3: "u2714746"
            }
        },
        "chaoliu": {
            "baidu": {
                li: "u2695019",
                li2: "u2713594",
                li3: "u2714745"
            }
        },
        "lvsellq": {
            "baidu": {
                li: "u2694954",
                li2: "u2713591",
                li3: "u2714743"
            }
        },
        "58dh": {
            "baidu": {
                li: "u2694946",
                li2: "u2713590",
                li3: "u2714742"
            }
        },
        "lianxiangllq": {
            "baidu": {
                li: "u2694756",
                li2: "u2713589",
                li3: "u2714741"
            }
        },
        "ucam": {
            "baidu": {
                li: "u2694702",
                li2: "u2713588",
                li3: "u2714740"
            }
        },
        "anzhuobizhi": {
            "baidu": {
                li: "u2694412",
                li2: "u2713587",
                li3: "u2714738"
            }
        },
        "xiaomigg02": {
            "baidu": {
                li: "u2693958",
                li2: "u2713586",
                li3: "u2714737"
            }
        },
        "xiaomigg01": {
            "baidu": {
                li: "u2693952",
                li2: "u2713585",
                li3: "u2714734"
            }
        },
        "dahuatoutiao": {
            "baidu": {
                li: "u2693944",
                li2: "u2713584",
                li3: "u2714732"
            }
        },
        "shifeng": {
            "baidu": {
                li: "u2691690",
                li2: "u2713583",
                li3: "u2714731"
            }
        },
        "yysun": {
            "baidu": {
                li: "u2689943",
                li2: "u2713581",
                li3: "u2714729"
            }
        },
        "huafubao": {
            "baidu": {
                li: "u2689540",
                li2: "u2713580",
                li3: "u2714727"
            }
        },
        "sgdhsh": {
            "baidu": {
                li: "u2689522",
                li2: "u2713577",
                li3: "u2714726"
            }
        },
        "sgdhjs": {
            "baidu": {
                li: "u2689515",
                li2: "u2713576",
                li3: "u2714724"
            }
        },
        "sgdhtt": {
            "baidu": {
                li: "u2689499",
                li2: "u2713573",
                li3: "u2714723"
            }
        },
        "zhicheng": {
            "baidu": {
                li: "u2689380",
                li2: "u2713571",
                li3: "u2714722"
            }
        },
        "yangsheng": {
            "baidu": {
                li: "u2689093",
                li2: "u2713570",
                li3: "u2714720"
            }
        },
        "dianxin404": {
            "baidu": {
                li: "u2688052",
                li2: "u2713567",
                li3: "u2714719"
            }
        },
        "fenxiangapp": {
            "baidu": {
                li: "u2687582",
                li2: "u2713566",
                li3: "u2714718"
            }
        },
        "hangu01": {
            "baidu": {
                li: "u2687386",
                li2: "u2713565",
                li3: "u2714717"
            }
        },
        "oupengllqz": {
            "baidu": {
                li: "u2687307",
                li2: "u2713564",
                li3: "u2714716"
            }
        },
        "shengming": {
            "baidu": {
                li: "u2687302",
                li2: "u2713563",
                li3: "u2714714"
            }
        },
        "mingnian": {
            "baidu": {
                li: "u2687295",
                li2: "u2713561",
                li3: "u2714713"
            }
        },
        "sogourecih5": {
            "baidu": {
                li: "u2686880",
                li2: "u2713557",
                li3: "u2714712"
            }
        },
        "gsbrowser_install": {
            "baidu": {
                li: "u2685565",
                li2: "u2713556",
                li3: "u2714711"
            }
        },
        "gsbrowser_wali": {
            "baidu": {
                li: "u2685611",
                li2: "u2713554",
                li3: "u2714710"
            }
        },
        "myworld": {
            "baidu": {
                li: "u2685622",
                li2: "u2713552",
                li3: "u2714708"
            }
        },
        "gsbrowser_myworld": {
            "baidu": {
                li: "u2685643",
                li2: "u2713551",
                li3: "u2714706"
            }
        },
        "mobileqq_QQ": {
            "baidu": {
                li: "u2685656",
                li2: "u2713550",
                li3: "u2714705"
            }
        },
        "pc6_zhongguoxiangqi": {
            "baidu": {
                li: "u2685673",
                li2: "u2713548",
                li3: "u2714702"
            }
        },
        "pc6_wanglingshashou": {
            "baidu": {
                li: "u2685693",
                li2: "u2713546",
                li3: "u2714701"
            }
        },
        "pc6_shaobingxiugaiqi": {
            "baidu": {
                li: "u2685711",
                li2: "u2713543",
                li3: "u2714700"
            }
        },
        "pc6_myworld": {
            "baidu": {
                li: "u2685730",
                li2: "u2713541",
                li3: "u2714696"
            }
        },
        "pc6_huoyingzhanji": {
            "baidu": {
                li: "u2685752",
                li2: "u2713540",
                li3: "u2714695"
            }
        },
        "pc6_findsomething": {
            "baidu": {
                li: "u2685761",
                li2: "u2713538",
                li3: "u2714694"
            }
        },
        "pc6_duowanmyworldhezi": {
            "baidu": {
                li: "u2685775",
                li2: "u2713536",
                li3: "u2714693"
            }
        },
        "gsbrowser_liqu": {
            "baidu": {
                li: "u2685817",
                li2: "u2713534",
                li3: "u2714692"
            }
        },
        "gsbrowser_mumayi": {
            "baidu": {
                li: "u2685792",
                li2: "u2713533",
                li3: "u2714689"
            }
        },
        "gsbrowser_tpin": {
            "baidu": {
                li: "u2685804",
                li2: "u2713530",
                li3: "u2714688"
            }
        },
        "gsbrowser_flyme": {
            "baidu": {
                li: "u2685803",
                li2: "u2713529",
                li3: "u2714687"
            }
        },
        "gsbrowser_lenovo": {
            "baidu": {
                li: "u2685750",
                li2: "u2713528",
                li3: "u2714686"
            }
        },
        "gsbrowser_gfan": {
            "baidu": {
                li: "u2685732",
                li2: "u2713527",
                li3: "u2714685"
            }
        },
        "gsbrowser_sogou": {
            "baidu": {
                li: "u2685728",
                li2: "u2713526",
                li3: "u2714684"
            }
        },
        "gsbrowser_vivo": {
            "baidu": {
                li: "u2685713",
                li2: "u2713525",
                li3: "u2714682"
            }
        },
        "gsbrowser_wandoujia": {
            "baidu": {
                li: "u2685709",
                li2: "u2713524",
                li3: "u2714681"
            }
        },
        "gsbrowser_appChina": {
            "baidu": {
                li: "u2685686",
                li2: "u2713523",
                li3: "u2714679"
            }
        },
        "gsbrowser_baidu": {
            "baidu": {
                li: "u2685667",
                li2: "u2713522",
                li3: "u2714678"
            }
        },
        "gsbrowser_nearme": {
            "baidu": {
                li: "u2685665",
                li2: "u2713521",
                li3: "u2714677"
            }
        },
        "gsbrowser_QQ": {
            "baidu": {
                li: "u2685655",
                li2: "u2713520",
                li3: "u2714675"
            }
        },
        "gsbrowser_noad": {
            "baidu": {
                li: "u2685689",
                li2: "u2713518",
                li3: "u2714674"
            }
        },
        "gsbrowser_taobao": {
            "baidu": {
                li: "u2685637",
                li2: "u2713516",
                li3: "u2714673"
            }
        },
        "gsbrowser_huawei": {
            "baidu": {
                li: "u2685626",
                li2: "u2713515",
                li3: "u2714672"
            }
        },
        "gsbrowser_360": {
            "baidu": {
                li: "u2685606",
                li2: "u2713514",
                li3: "u2714671"
            }
        },
        "gsbrowser_website": {
            "baidu": {
                li: "u2685598",
                li2: "u2713513",
                li3: "u2714670"
            }
        },
        "m021_liantongbrowser": {
            "baidu": {
                li: "u2683569",
                li2: "u2713512",
                li3: "u2714668"
            }
        },
        "m021_gsbrowser": {
            "baidu": {
                li: "u2683561",
                li2: "u2713511",
                li3: "u2714667"
            }
        },
        "6789search": {
            "baidu": {
                li: "u2683712",
                li2: "u2713509",
                li3: "u2714666"
            }
        },
        "qiaohuiwangluo02": {
            "baidu": {
                li: "u2683720",
                li2: "u2713507",
                li3: "u2714665"
            }
        },
        "16wifi": {
            "baidu": {
                li: "u2683574",
                li2: "u2713505",
                li3: "u2714664"
            }
        },
        "gxt": {
            "baidu": {
                li: "u2683285",
                li2: "u2713503",
                li3: "u2714663"
            }
        },
        "sqzhushou": {
            "baidu": {
                li: "u2682464",
                li2: "u2713501",
                li3: "u2714662"
            }
        },
        "operabrower": {
            "baidu": {
                li: "u2682280",
                li2: "u2713500",
                li3: "u2714660"
            }
        },
        "uckuzhanjk": {
            "baidu": {
                li: "u2681198",
                li2: "u2713499",
                li3: "u2714659"
            }
        },
        "yiwanwuxian": {
            "baidu": {
                li: "u2681178",
                li2: "u2713497",
                li3: "u2714657"
            }
        },
        "xltianqitong": {
            "baidu": {
                li: "u2680059",
                li2: "u2713496",
                li3: "u2714655"
            }
        },
        "dopah5": {
            "baidu": {
                li: "u2679924",
                li2: "u2713495",
                li3: "u2714654"
            }
        },
        "coolpadbrowser01": {
            "baidu": {
                li: "u2678417",
                li2: "u2713494",
                li3: "u2714653"
            }
        },
        "qiaohuiwangluo01": {
            "baidu": {
                li: "u2678182",
                li2: "u2713491",
                li3: "u2714652"
            }
        },
        "appylm": {
            "baidu": {
                li: "u2678139",
                li2: "u2713490",
                li3: "u2714651"
            }
        },
        "xiaobowifi": {
            "baidu": {
                li: "u2675861",
                li2: "u2713489",
                li3: "u2714650"
            }
        },
        "duotuo": {
            "baidu": {
                li: "u2675804",
                li2: "u2713487",
                li3: "u2714649"
            }
        },
        "boxmarket": {
            "baidu": {
                li: "u2675817",
                li2: "u2713485",
                li3: "u2714648"
            }
        },
        "aishang": {
            "baidu": {
                li: "u2675535",
                li2: "u2713483",
                li3: "u2714647"
            }
        },
        "wutongwifi": {
            "baidu": {
                li: "u2675982",
                li2: "u2713482",
                li3: "u2714644"
            }
        },
        "360so": {
            "baidu": {
                li: "u2624228",
                li2: "u2713480",
                li3: "u2714643"
            }
        },
        "shujuan02": {
            "baidu": {
                li: "u2674421",
                li2: "u2713479",
                li3: "u2714642"
            }
        },
        "shujuan03": {
            "baidu": {
                li: "u2674430",
                li2: "u2713478",
                li3: "u2714641"
            }
        },
        "shujuan04": {
            "baidu": {
                li: "u2674436",
                li2: "u2713477",
                li3: "u2714640"
            }
        },
        "shujuan05": {
            "baidu": {
                li: "u2674445",
                li2: "u2713474",
                li3: "u2714639"
            }
        },
        "shujuan06": {
            "baidu": {
                li: "u2674451",
                li2: "u2713473",
                li3: "u2714638"
            }
        },
        "xianguo": {
            "baidu": {
                li: "u2674289",
                li2: "u2713468",
                li3: "u2714635"
            }
        },
        "zhongyangtianqi": {
            "baidu": {
                li: "u2674305",
                li2: "u2713466",
                li3: "u2714634"
            }
        },
        "m021_wy050": {
            "baidu": {
                li: "u2536591",
                li2: "u2713464",
                li3: "u2714632"
            }
        },
        "678sjdh": {
            "baidu": {
                li: "u2672654",
                li2: "u2713463",
                li3: "u2714631"
            }
        },
        "qqbrowser": {
            "baidu": {
                li2: "u2713462",
                li3: "u2714629"
            },
            "gdt": {
            	li: "6080512200788158"
            }
        },
        "daping": {
            "baidu": {
                li: "u2671812",
                li2: "u2713461",
                li3: "u2714628"
            }
        },
        "weixinfxzf": {
            "baidu": {
                li: "u2671614",
                li2: "u2713458",
                li3: "u2714627"
            }
        },
        "youxinapp": {
            "baidu": {
                li: "u2671418",
                li2: "u2713457",
                li3: "u2714626"
            }
        },
        "huituikeji": {
            "baidu": {
                li: "u2670435",
                li2: "u2713454",
                li3: "u2714625"
            }
        },
        "10086mz": {
            "baidu": {
                li: "u2670470",
                li2: "u2713451",
                li3: "u2714623"
            }
        },
        "tianyizone": {
            "baidu": {
                li: "u2669318",
                li2: "u2713450",
                li3: "u2714622"
            }
        },
        "chubao": {
            "baidu": {
                li: "u2666374",
                li2: "u2713449",
                li3: "u2714621"
            }
        },
        "xiaomi": {
            "baidu": {
                li: "u2666305",
                li2: "u2713448",
                li3: "u2714620"
            }
        },
        "baidubrowser": {
            "baidu": {
                li: "u2666263",
                li2: "u2713446",
                li3: "u2714619"
            }
        },
        "yousu": {
            "baidu": {
                li: "u2661155",
                li2: "u2713445",
                li3: "u2714617"
            }
        },
        "juheshuju": {
            "baidu": {
                li: "u2659969",
                li2: "u2713443",
                li3: "u2714616"
            }
        },
        "lianxianglvcha": {
            "baidu": {
                li: "u2659957",
                li2: "u2713442",
                li3: "u2714614"
            }
        },
        "gsbrowser": {
            "baidu": {
                li: "u2659921",
                li2: "u2713440",
                li3: "u2714613"
            }
        },
        "m021_gsbrowser_install": {
            "baidu": {
                li: "u2659936",
                li2: "u2713439",
                li3: "u2714612"
            }
        },
        "wdcx01": {
            "baidu": {
                li: "u2658903",
                li2: "u2713435",
                li3: "u2714611"
            }
        },
        "wdcx": {
            "baidu": {
                li: "u2656512",
                li2: "u2713434",
                li3: "u2714609"
            }
        },
        "haixunyidong": {
            "baidu": {
                li: "u2654118",
                li2: "u2713432",
                li3: "u2714608"
            }
        },
        "uckuzhan": {
            "baidu": {
                li: "u2652124",
                li2: "u2713431",
                li3: "u2714607"
            }
        },
        "m021_myworld": {
            "baidu": {
                li: "u2652106",
                li2: "u2713430",
                li3: "u2714606"
            }
        },
        "shujuan01": {
            "baidu": {
                li: "u2649899",
                li2: "u2713429",
                li3: "u2714605"
            }
        },
        "ucllqsun03": {
            "baidu": {
                li: "u2649542",
                li2: "u2713427",
                li3: "u2714603"
            }
        },
        "ucllqsun02": {
            "baidu": {
                li: "u2649525",
                li2: "u2713426",
                li3: "u2714602"
            }
        },
        "yjqlds01": {
            "baidu": {
                li: "u2649283",
                li2: "u2713425",
                li3: "u2714601"
            }
        },
        "yuedu5": {
            "baidu": {
                li: "u2648814",
                li2: "u2713423",
                li3: "u2714600"
            }
        },
        "yuedu4": {
            "baidu": {
                li: "u2648789",
                li2: "u2713422",
                li3: "u2714599"
            }
        },
        "yuedu3": {
            "baidu": {
                li: "u2648741",
                li2: "u2713421",
                li3: "u2714598"
            }
        },
        "yuedu2": {
            "baidu": {
                li: "u2648658",
                li2: "u2713420",
                li3: "u2714597"
            }
        },
        "yuedu1": {
            "baidu": {
                li: "u2648597",
                li2: "u2713418",
                li3: "u2714596"
            }
        },
        "ucllqsun01": {
            "baidu": {
                li: "u2648198",
                li2: "u2713417",
                li3: "u2714595"
            }
        },
        "shujuan": {
            "baidu": {
                li: "u2648402",
                li2: "u2713416",
                li3: "u2714593"
            }
        },
        "aishangwifi": {
            "baidu": {
                li: "u2648379",
                li2: "u2713414",
                li3: "u2714592"
            }
        },
        "tiantianrj": {
            "baidu": {
                li: "u2648334",
                li2: "u2713413",
                li3: "u2714591"
            }
        },
        "ljbrowser": {
            "baidu": {
                li: "u2648226",
                li2: "u2713412",
                li3: "u2714590"
            }
        },
        "jinlisun": {
            "baidu": {
                li: "u2641147",
                li2: "u2713410",
                li3: "u2714589"
            }
        },
        "ucllqsun": {
            "baidu": {
                li: "u2638680",
                li2: "u2713408",
                li3: "u2714587"
            }
        },
        "hjjingling": {
            "baidu": {
                li: "u2646233",
                li2: "u2713407",
                li3: "u2714584"
            }
        },
        "zhanglida": {
            "baidu": {
                li: "u2642800",
                li2: "u2713406",
                li3: "u2714583"
            }
        },
        "taosuoping": {
            "baidu": {
                li: "u2641079",
                li2: "u2713405",
                li3: "u2714582"
            }
        },
        "zhuanyidou": {
            "baidu": {
                li: "u2640987",
                li2: "u2713401",
                li3: "u2714581"
            }
        },
        "youxinh5": {
            "baidu": {
                li: "u2637042",
                li2: "u2713400",
                li3: "u2714579"
            }
        },
        "511dianying": {
            "baidu": {
                li: "u2636922",
                li2: "u2713398",
                li3: "u2714578"
            }
        },
        "m021_hyx007": {
            "baidu": {
                li: "u2636782",
                li2: "u2713395",
                li3: "u2714577"
            }
        },
        "m021_hyx006": {
            "baidu": {
                li: "u2636754",
                li2: "u2713394",
                li3: "u2714576"
            }
        },
        "m021_hyx005": {
            "baidu": {
                li: "u2636729",
                li2: "u2713392",
                li3: "u2714575"
            }
        },
        "m021_hyx004": {
            "baidu": {
                li: "u2636706",
                li2: "u2713391",
                li3: "u2714574"
            }
        },
        "m021_hyx003": {
            "baidu": {
                li: "u2636653",
                li2: "u2713390",
                li3: "u2714568"
            }
        },
        "laokgame": {
            "baidu": {
                li: "u2637445",
                li2: "u2713386",
                li3: "u2714567"
            }
        },
        "m021_hyx002": {
            "baidu": {
                li: "u2636117",
                li2: "u2713384",
                li3: "u2714566"
            }
        },
        "m021_hyx001": {
            "baidu": {
                li: "u2636107",
                li2: "u2713382",
                li3: "u2714565"
            }
        },
        "yijianqinglidashi": {
            "baidu": {
                li: "u2635951",
                li2: "u2713380",
                li3: "u2714564"
            }
        },
        "chubaophone": {
            "baidu": {
                li: "u2636092",
                li2: "u2713378",
                li3: "u2714563"
            }
        },
        "mzol": {
            "baidu": {
                li: "u2635722",
                li2: "u2713376",
                li3: "u2714562"
            }
        },
        "qiaohuiwangluo": {
            "baidu": {
                li: "u2634679",
                li2: "u2713374",
                li3: "u2714561"
            }
        },
        "jiuyi160": {
            "baidu": {
                li: "u2634489",
                li2: "u2713372",
                li3: "u2714559"
            }
        },
        "zuoankeji": {
            "baidu": {
                li: "u2633133",
                li2: "u2713370",
                li3: "u2714557"
            }
        },
        "guguniao": {
            "baidu": {
                li: "u2630978",
                li2: "u2713368",
                li3: "u2714556"
            }
        },
        "hongbaokuaishou": {
            "baidu": {
                li: "u2628441",
                li2: "u2713367",
                li3: "u2714554"
            }
        },
        "wifixhwy": {
            "baidu": {
                li: "u2627265",
                li2: "u2713366",
                li3: "u2714553"
            }
        },
        "operashangdian": {
            "baidu": {
                li: "u2627154",
                li2: "u2713363",
                li3: "u2714551"
            }
        },
        "wpsandroid": {
            "baidu": {
                li: "u2626771",
                li2: "u2713362",
                li3: "u2714549"
            }
        },
        "yijianqinglidashi02": {
            "baidu": {
                li: "u2622803",
                li2: "u2713359",
                li3: "u2714548"
            }
        },
        "yijianqinglidashi03": {
            "baidu": {
                li: "u2622821",
                li2: "u2713358",
                li3: "u2714547"
            }
        },
        "yonglian": {
            "baidu": {
                li: "u2615542",
                li2: "u2713357",
                li3: "u2714546"
            }
        },
        "aoyouie": {
            "baidu": {
                li: "u2615534",
                li2: "u2713351",
                li3: "u2714545"
            }
        },
        "renrensuoping": {
            "baidu": {
                li: "u2618179",
                li2: "u2713348",
                li3: "u2714543"
            }
        },
        "jsonline5": {
            "baidu": {
                li: "u2668994",
                li2: "u2713346",
                li3: "u2714542"
            }
        },
        "jsonline4": {
            "baidu": {
                li: "u2668985",
                li2: "u2713345",
                li3: "u2714541"
            }
        },
        "jsonline3": {
            "baidu": {
                li: "u2668905",
                li2: "u2713341",
                li3: "u2714540"
            }
        },
        "jsonline2": {
            "baidu": {
                li: "u2613800",
                li2: "u2713340",
                li3: "u2714539"
            }
        },
        "jsonline1": {
            "baidu": {
                li: "u2594033",
                li2: "u2713336",
                li3: "u2714538"
            }
        },
        "shangyewifiliu2": {
            "baidu": {
                li: "u2612143",
                li2: "u2713335",
                li3: "u2714537"
            }
        },
        "wifijl": {
            "baidu": {
                li: "u2610540",
                li2: "u2713333",
                li3: "u2714536"
            }
        },
        "114mobileios": {
            "baidu": {
                li: "u2610225",
                li2: "u2713328",
                li3: "u2714534"
            }
        },
        "114mobile": {
            "baidu": {
                li: "u2610261",
                li2: "u2713327",
                li3: "u2714533"
            }
        },
        "shenghuorili": {
            "baidu": {
                li: "u2608701",
                li2: "u2713325",
                li3: "u2714532"
            }
        },
        "2345m": {
            "baidu": {
                li: "u2607885",
                li2: "u2713323",
                li3: "u2714531"
            }
        },
        "8684": {
            "baidu": {
                li: "u2356214",
                li2: "u2713322",
                li3: "u2714530"
            }
        },
        "021dh": {
            "baidu": {
                li: "u2530657",
                li2: "u2713320",
                li3: "u2714528"
            }
        },
        "10086wy": {
            "baidu": {
                li: "u2426684",
                li2: "u2713319",
                li3: "u2714527"
            }
        },
        "2345daohang": {
            "baidu": {
                li: "u2272381",
                li2: "u2713318",
                li3: "u2714526"
            }
        },
        "2345yuki": {
            "baidu": {
                li: "u2272378",
                li2: "u2713316",
                li3: "u2714525"
            }
        },
        "28app": {
            "sogou": {
                li: "562456",
                li2: "562456",
                li3: "562456"
            }
        },
        "4gbrowser": {
            "baidu": {
                li: "u2319240",
                li2: "u2713313",
                li3: "u2714523"
            }
        },
        "51shoujizhushou": {
            "baidu": {
                li: "u2449816",
                li2: "u2713312",
                li3: "u2714522"
            }
        },
        "678plus": {
            "baidu": {
                li: "u2472719",
                li2: "u2713309",
                li3: "u2714521"
            }
        },
        "96ck": {
            "baidu": {
                li: "u2584137",
                li2: "u2713306",
                li3: "u2714520"
            }
        },
        "999wxdh": {
            "baidu": {
                li: "u2540073",
                li2: "u2713303",
                li3: "u2714519"
            }
        },
        "aigao": {
            "baidu": {
                li: "u2383943",
                li2: "u2713301",
                li3: "u2714518"
            }
        },
        "aishangbrowser": {
            "baidu": {
                li: "u2383939",
                li2: "u2713298",
                li3: "u2714517"
            }
        },
        "aiyuedu": {
            "baidu": {
                li: "u2547548",
                li2: "u2713296",
                li3: "u2714516"
            }
        },
        "androidesk": {
            "baidu": {
                li: "u2327356",
                li2: "u2713295",
                li3: "u2714493"
            }
        },
        "anzhuohongbao": {
            "baidu": {
                li: "u2428346",
                li2: "u2713294",
                li3: "u2714492"
            }
        },
        "apdft_lc001": {
            "baidu": {
                li: "u2563520",
                li2: "u2713024",
                li3: "u2713787"
            }
        },
        "apdft_lc002": {
            "baidu": {
                li: "u2563646",
                li2: "u2713023",
                li3: "u2713786"
            }
        },
        "apdft_lc003": {
            "baidu": {
                li: "u2563659",
                li2: "u2713021",
                li3: "u2713784"
            }
        },
        "apdft_lc004": {
            "baidu": {
                li: "u2563675",
                li2: "u2713020",
                li3: "u2713783"
            }
        },
        "apdft_lc005": {
            "baidu": {
                li: "u2563687",
                li2: "u2713019",
                li3: "u2713782"
            }
        },
        "baiducom": {
            "baidu": {
                li: "u2511451",
                li2: "u2713283",
                li3: "u2714485"
            }
        },
        "bdxml": {
            "baidu": {
                li: "u2585278",
                li2: "u2713282",
                li3: "u2714484"
            }
        },
        "beiguaphone": {
            "baidu": {
                li: "u2580646",
                li2: "u2713280",
                li3: "u2714483"
            }
        },
        "bodaophone": {
            "baidu": {
                li: "u2503283",
                li2: "u2713279",
                li3: "u2714482"
            }
        },
        "browseruc": {
            "baidu": {
                li: "u2574296",
                li2: "u2713277",
                li3: "u2714481"
            }
        },
        "bzhan": {
            "baidu": {
                li: "u2593342",
                li2: "u2713276",
                li3: "u2714480"
            }
        },
        "caihongbrowser": {
            "baidu": {
                li: "u2560453",
                li2: "u2713275",
                li3: "u2714479"
            }
        },
        "caimanxiangji": {
            "baidu": {
                li: "u2593357",
                li2: "u2713274",
                li3: "u2714476"
            }
        },
        "chabrowser": {
            "baidu": {
                li: "u2579378",
                li2: "u2713272",
                li3: "u2714474"
            }
        },
        "chamusdk": {
            "baidu": {
                li: "u2597498",
                li2: "u2713271",
                li3: "u2714473"
            }
        },
        "chaojiwifi": {
            "baidu": {
                li: "u2361491",
                li2: "u2713269",
                li3: "u2714471"
            }
        },
        "chenmeng": {
            "baidu": {
                li: "u2562486",
                li2: "u2713268",
                li3: "u2714469"
            }
        },
        "cvbrowser": {
            "baidu": {
                li: "u2327364",
                li2: "u2713267",
                li3: "u2714468"
            }
        },
        "dfweather": {
            "baidu": {
                li: "u2525700",
                li2: "u2713265",
                li3: "u2714467"
            }
        },
        "dianfuyule": {
            "baidu": {
                li: "u2547713",
                li2: "u2713264",
                li3: "u2714466"
            }
        },
        "dingdingapp": {
            "baidu": {
                li: "u2588898",
                li2: "u2713262",
                li3: "u2714465"
            }
        },
        "domobile": {
            "baidu": {
                li: "u2541754",
                li2: "u2713261",
                li3: "u2714464"
            }
        },
        "dxzt": {
            "baidu": {
                li: "u2314343",
                li2: "u2713259",
                li3: "u2714463"
            }
        },
        "esbrowser": {
            "baidu": {
                li: "u2375187",
                li2: "u2713257",
                li3: "u2714462"
            }
        },
        "ewifi": {
            "baidu": {
                li: "u2484851",
                li2: "u2713256",
                li3: "u2714461"
            }
        },
        "ewifi9": {
            "baidu": {
                li: "u2594051",
                li2: "u2713254",
                li3: "u2714460"
            }
        },
        "faleme": {
            "baidu": {
                li: "u2572244",
                li2: "u2713253",
                li3: "u2714459"
            }
        },
        "firefox": {
            "baidu": {
                li: "u2351855",
                li2: "u2713252",
                li3: "u2714458"
            }
        },
        "gaosubrowser": {
            "baidu": {
                li: "u2381057",
                li2: "u2713251",
                li3: "u2714456"
            }
        },
        "gaoxiaopige": {
            "baidu": {
                li: "u2556050",
                li2: "u2713250",
                li3: "u2714455"
            }
        },
        "gongxinweishi": {
            "baidu": {
                li: "u2484855",
                li2: "u2713249",
                li3: "u2714454"
            }
        },
        "gouwudating": {
            "baidu": {
                li: "u2585525",
                li2: "565291",
                li3: "u2714453"
            }
        },
        "guangdianbizhi": {
            "baidu": {
                li: "u2305439",
                li2: "u2713246",
                li3: "u2714452"
            }
        },
        "guminbao": {
            "baidu": {
                li: "u2574261",
                li2: "u2713244",
                li3: "u2714451"
            }
        },
        "h5browser": {
            "baidu": {
                li: "u2574253",
                li2: "u2713241",
                li3: "u2714450"
            }
        },
        "haixunyitong": {
            "baidu": {
                li: "u2562472",
                li2: "u2713240",
                li3: "u2714449"
            }
        },
        "hangu": {
            "baidu": {
                li: "u2596938",
                li2: "u2713239",
                li3: "u2714448"
            }
        },
        "haoh5": {
            "baidu": {
                li: "u2575936",
                li2: "u2713238",
                li3: "u2714447"
            }
        },
        "holazhuomian": {
            "baidu": {
                li: "u2536033",
                li2: "u2713237",
                li3: "u2714445"
            }
        },
        "hongbaoliulanqi": {
            "baidu": {
                li: "u2306836",
                li2: "u2713236",
                li3: "u2714444"
            }
        },
        "hongbaorili": {
            "baidu": {
                li: "u2568237",
                li2: "u2713235",
                li3: "u2714433"
            }
        },
        "huisuoping": {
            "baidu": {
                li: "u2371552",
                li2: "u2713234",
                li3: "u2714432"
            }
        },
        "huohoubrowser": {
            "baidu": {
                li: "u2386625",
                li2: "u2713232",
                li3: "u2714430"
            }
        },
        "jiaxiaobaodian": {
            "baidu": {
                li: "u2530704",
                li2: "u2713231",
                li3: "u2714429"
            }
        },
        "jisuanguanjia": {
            "baidu": {
                li: "u2404338",
                li2: "u2713229",
                li3: "u2714428"
            }
        },
        "jsonline": {
            "baidu": {
                li: "u2482174",
                li2: "u2713226",
                li3: "u2714426"
            }
        },
        "jzonline9": {
            "baidu": {
                li: "u2716153",
                li2: "u2713225",
                li3: "u2714425"
            }
        },
        "kangjiaphone": {
            "baidu": {
                li: "u2548304",
                li2: "u2713224",
                li3: "u2714424"
            }
        },
        "kkwifi": {
            "baidu": {
                li: "u2508606",
                li2: "u2713222",
                li3: "u2714423"
            }
        },
        "kudianzhuomian": {
            "baidu": {
                li: "u2469608",
                li2: "u2713221",
                li3: "u2714422"
            }
        },
        "kuhuasuoping": {
            "baidu": {
                li: "u2576948",
                li2: "u2713215",
                li3: "u2714420"
            }
        },
        "lanrentianqi": {
            "baidu": {
                li: "u2589976",
                li2: "u2713212",
                li3: "u2714419"
            }
        },
        "laobansuoping": {
            "baidu": {
                li: "u2592501",
                li2: "u2713207",
                li3: "u2714417"
            }
        },
        "laohuangli": {
            "baidu": {
                li: "u2375170",
                li2: "u2713202",
                li3: "u2714416"
            }
        },
        "lemonbrowser": {
            "baidu": {
                li: "u2375320",
                li2: "u2713200",
                li3: "u2714415"
            }
        },
        "leshitiyu": {
            "baidu": {
                li: "u2452489",
                li2: "u2713197",
                li3: "u2714414"
            }
        },
        "lewuxian": {
            "baidu": {
                li: "u2579295",
                li2: "u2713196",
                li3: "u2714411"
            }
        },
        "lezhuansuoping": {
            "baidu": {
                li: "u2525593",
                li2: "u2713194",
                li3: "u2714409"
            }
        },
        "liangwang": {
            "baidu": {
                li: "u2508726",
                li2: "u2713193",
                li3: "u2714408"
            }
        },
        "liantong001": {
            "baidu": {
                li: "u2581086",
                li2: "u2713191",
                li3: "u2714407"
            }
        },
        "liantongbrowser": {
            "sogou": {
                li: "571797",
                li2: "571797",
                li3: "571797"
            }
        },
        "lianxiang114la": {
            "baidu": {
                li: "u2549479",
                li2: "u2713187",
                li3: "u2714404"
            }
        },
        "lianxiangrili": {
            "baidu": {
                li: "u2533451",
                li2: "u2713186",
                li3: "u2714403"
            }
        },
        "liebaoxml": {
            "baidu": {
                li: "u2585267",
                li2: "u2713184",
                li3: "u2714401"
            }
        },
        "lijianmin": {
            "baidu": {
                li: "u2572237",
                li2: "u2713183",
                li3: "u2714399"
            }
        },
        "liuliangba": {
            "baidu": {
                li: "u2426696",
                li2: "u2713182",
                li3: "u2714398"
            }
        },
        "llmfwifi": {
            "baidu": {
                li: "u2305445",
                li2: "u2713178",
                li3: "u2714397"
            }
        },
        "m021": {
            "baidu": {
                li: "u2536063",
                li2: "u2713176",
                li3: "u2714395"
            }
        },
        "m021_chenz": {
            "baidu": {
                li: "u2536122",
                li2: "u2713175",
                li3: "u2714394"
            }
        },
        "m021_gsllq": {
            "baidu": {
                li: "u2536070",
                li2: "u2713174",
                li3: "u2714392"
            }
        },
        "m021_mbzm": {
            "baidu": {
                li: "u2536106",
                li2: "u2713170",
                li3: "u2714390"
            }
        },
        "m021_pgzs": {
            "baidu": {
                li: "u2536113",
                li2: "u2713168",
                li3: "u2714388"
            }
        },
        "m021_waitui001": {
            "baidu": {
                li: "u2540884",
                li2: "u2713166",
                li3: "u2714386"
            }
        },
        "m021_waitui002": {
            "baidu": {
                li: "u2540887",
                li2: "u2713164",
                li3: "u2714385"
            }
        },
        "m021_waitui003": {
            "baidu": {
                li: "u2540897",
                li2: "u2713163",
                li3: "u2714384"
            }
        },
        "m021_waitui004": {
            "baidu": {
                li: "u2540898",
                li2: "u2713162",
                li3: "u2714381"
            }
        },
        "m021_waitui005": {
            "baidu": {
                li: "u2540901",
                li2: "u2713161",
                li3: "u2714380"
            }
        },
        "m021_waitui006": {
            "baidu": {
                li: "u2540903",
                li2: "u2713160",
                li3: "u2714379"
            }
        },
        "m021_waitui007": {
            "baidu": {
                li: "u2540904",
                li2: "u2713159",
                li3: "u2714377"
            }
        },
        "m021_waitui008": {
            "baidu": {
                li: "u2540905",
                li2: "u2713158",
                li3: "u2714375"
            }
        },
        "m021_waitui009": {
            "baidu": {
                li: "u2540907",
                li2: "u2713156",
                li3: "u2714373"
            }
        },
        "m021_waitui010": {
            "baidu": {
                li: "u2540909",
                li2: "u2713154",
                li3: "u2714371"
            }
        },
        "m021_waitui011": {
            "baidu": {
                li: "u2540912",
                li2: "u2713153",
                li3: "u2714369"
            }
        },
        "m021_waitui015": {
            "baidu": {
                li: "u2540916",
                li2: "u2713152",
                li3: "u2714367"
            }
        },
        "m021_waitui017": {
            "baidu": {
                li: "u2540919",
                li2: "u2713150",
                li3: "u2714365"
            }
        },
        "m021_waitui021": {
            "baidu": {
                li: "u2602544",
                li2: "u2713148",
                li3: "u2714364"
            }
        },
        "m021_waitui023": {
            "baidu": {
                li: "u2602568",
                li2: "u2713145",
                li3: "u2714362"
            }
        },
        "m021_waitui026": {
            "baidu": {
                li: "u2602590",
                li2: "u2713142",
                li3: "u2714360"
            }
        },
        "m021_waitui027": {
            "baidu": {
                li: "u2602614",
                li2: "u2713140",
                li3: "u2714357"
            }
        },
        "m021_waitui028": {
            "baidu": {
                li: "u2602628",
                li2: "u2713139",
                li3: "u2714353"
            }
        },
        "m021_waitui030": {
            "baidu": {
                li: "u2602647",
                li2: "u2713137",
                li3: "u2714352"
            }
        },
        "m021_waitui031": {
            "baidu": {
                li: "u2683798",
                li2: "u2713135",
                li3: "u2714350"
            }
        },
        "m021_waitui032": {
            "baidu": {
                li: "u2683802",
                li2: "u2713091",
                li3: "u2714349"
            }
        },
        "m021_waitui033": {
            "baidu": {
                li: "u2683804",
                li2: "u2713090",
                li3: "u2714348"
            }
        },
        "m021_waitui034": {
            "baidu": {
                li: "u2683806",
                li2: "u2713088",
                li3: "u2714346"
            }
        },
        "m021_waitui035": {
            "baidu": {
                li: "u2683808",
                li2: "u2713087",
                li3: "u2714345"
            }
        },
        "m021_wy001": {
            "baidu": {
                li: "u2536248",
                li2: "u2713085",
                li3: "u2714344"
            }
        },
        "m021_wy002": {
            "baidu": {
                li: "u2536257",
                li2: "u2713082",
                li3: "u2714343"
            }
        },
        "m021_wy004": {
            "baidu": {
                li: "u2536282",
                li2: "u2713080",
                li3: "u2714342"
            }
        },
        "m021_wy005": {
            "baidu": {
                li: "u2536383",
                li2: "u2713078",
                li3: "u2714341"
            }
        },
        "m021_wy006": {
            "baidu": {
                li: "u2536379",
                li2: "u2713077",
                li3: "u2714340"
            }
        },
        "m021_wy007": {
            "baidu": {
                li: "u2536389",
                li2: "u2713076",
                li3: "u2714339"
            }
        },
        "m021_wy008": {
            "baidu": {
                li: "u2536396",
                li2: "u2713075",
                li3: "u2714338"
            }
        },
        "m021_wy009": {
            "baidu": {
                li: "u2536406",
                li2: "u2713074",
                li3: "u2714336"
            }
        },
        "m021_wy010": {
            "baidu": {
                li: "u2536408",
                li2: "u2713072",
                li3: "u2714335"
            }
        },
        "m021_wy011": {
            "baidu": {
                li: "u2536416",
                li2: "u2713071",
                li3: "u2714334"
            }
        },
        "m021_wy012": {
            "baidu": {
                li: "u2536419",
                li2: "u2713069",
                li3: "u2714332"
            }
        },
        "m021_wy013": {
            "baidu": {
                li: "u2673209",
                li2: "u2713067",
                li3: "u2714331"
            }
        },
        "m021_wy014": {
            "baidu": {
                li: "u2536429",
                li2: "u2713065",
                li3: "u2714330"
            }
        },
        "m021_wy015": {
            "baidu": {
                li: "u2536433",
                li2: "u2713064",
                li3: "u2714329"
            }
        },
        "m021_wy016": {
            "baidu": {
                li: "u2536437",
                li2: "u2713063",
                li3: "u2714328"
            }
        },
        "m021_wy017": {
            "baidu": {
                li: "u2536442",
                li2: "u2713062",
                li3: "u2714327"
            }
        },
        "m021_wy018": {
            "baidu": {
                li: "u2536446",
                li2: "u2713059",
                li3: "u2714326"
            }
        },
        "m021_wy019": {
            "baidu": {
                li: "u2536453",
                li2: "u2713058",
                li3: "u2714323"
            }
        },
        "m021_wy020": {
            "baidu": {
                li: "u2536447",
                li2: "u2713057",
                li3: "u2714321"
            }
        },
        "m021_wy021": {
            "baidu": {
                li: "u2536462",
                li2: "u2713055",
                li3: "u2714134"
            }
        },
        "m021_wy022": {
            "baidu": {
                li: "u2536466",
                li2: "u2713054",
                li3: "u2714133"
            }
        },
        "m021_wy023": {
            "baidu": {
                li: "u2536476",
                li2: "u2713053",
                li3: "u2714132"
            }
        },
        "m021_wy024": {
            "baidu": {
                li: "u2536480",
                li2: "u2713052",
                li3: "u2714131"
            }
        },
        "m021_wy025": {
            "baidu": {
                li: "u2536487",
                li2: "u2713050",
                li3: "u2714130"
            }
        },
        "m021_wy026": {
            "baidu": {
                li: "u2536494",
                li2: "u2713048",
                li3: "u2714128"
            }
        },
        "m021_wy027": {
            "baidu": {
                li: "u2536496",
                li2: "u2713047",
                li3: "u2714127"
            }
        },
        "m021_wy028": {
            "baidu": {
                li: "u2536499",
                li2: "u2713044",
                li3: "u2714126"
            }
        },
        "m021_wy029": {
            "baidu": {
                li: "u2536506",
                li2: "u2713043",
                li3: "u2714123"
            }
        },
        "m021_wy030": {
            "baidu": {
                li: "u2536509",
                li2: "u2713041",
                li3: "u2714122"
            }
        },
        "m021_wy031": {
            "baidu": {
                li: "u2536513",
                li2: "u2713039",
                li3: "u2714121"
            }
        },
        "m021_wy032": {
            "baidu": {
                li: "u2536514",
                li2: "u2713038",
                li3: "u2714120"
            }
        },
        "m021_wy033": {
            "baidu": {
                li: "u2536515",
                li2: "u2713036",
                li3: "u2714119"
            }
        },
        "m021_wy034": {
            "baidu": {
                li: "u2536523",
                li2: "u2713032",
                li3: "u2714118"
            }
        },
        "m021_wy035": {
            "baidu": {
                li: "u2536526",
                li2: "u2713030",
                li3: "u2714117"
            }
        },
        "m021_wy036": {
            "baidu": {
                li: "u2536532",
                li2: "u2713029",
                li3: "u2714116"
            }
        },
        "m021_wy044": {
            "baidu": {
                li: "u2536557",
                li2: "u2713028",
                li3: "u2714114"
            }
        },
        "m021_wy047": {
            "baidu": {
                li: "u2536568",
                li2: "u2713027",
                li3: "u2714111"
            }
        },
        "m021_wy063": {
            "baidu": {
                li: "u2536687",
                li2: "u2713026",
                li3: "u2713789"
            }
        },
        "m021_wy083": {
            "baidu": {
                li: "u2716220",
                li2: "u2713025",
                li3: "u2713788"
            }
        },
        "m021dh": {
            "baidu": {
                li: "u2525302",
                li2: "u2713017",
                li3: "u2713780"
            }
        },
        "maopaobrowser": {
            "baidu": {
                li: "u2375314",
                li2: "u2713016",
                li3: "u2713779"
            }
        },
        "mayibrowser": {
            "baidu": {
                li: "u2552924",
                li2: "u2713014",
                li3: "u2713778"
            }
        },
        "meirenzhuang": {
            "baidu": {
                li: "u2470705",
                li2: "u2713013",
                li3: "u2713777"
            }
        },
        "meizubrowser": {
            "baidu": {
                li: "u2470718",
                li2: "u2713012",
                li3: "u2713776"
            }
        },
        "meizuliulanqi": {
            "baidu": {
                li: "u2490015",
                li2: "u2713011",
                li3: "u2713775"
            }
        },
        "miaowu": {
            "baidu": {
                li: "u2280816",
                li2: "u2713010",
                li3: "u2713774"
            }
        },
        "moban": {
            "baidu": {
                li: "u2371577",
                li2: "u2713009",
                li3: "u2713772"
            }
        },
        "ningmengzhuomian": {
            "baidu": {
                li: "u2449811",
                li2: "u2713008",
                li3: "u2713771"
            }
        },
        "coolpadbrowser": {
            "baidu": {
                li: "u2407595",
                li3: "u2713770"
            },
            "sogou": {
            	li2: "524815"
            }
        },
        "oppobrowser": {
            "baidu": {
                li: "u2323755",
                li3: "u2713769"
            },
            "sogou": {
            	li2: "524815"
            }
        },
        "vivobrowser": {
            "baidu": {
                li: "u2407603",
                li3: "u2713768"
            },
            "sogou": {
            	li2: "524815"
            }
        },
        "gioneebrowser": {
            "baidu": {
                li: "u2375512",
                li3: "u2713767"
            },
            "sogou": {
            	li2: "524815"
            }
        },
        "lt114116": {
            "baidu": {
                li: "u2380766",
                li3: "u2713766"
            },
            "sogou": {
            	li2: "524815"
            }
        },
        "paoba": {
            "baidu": {
                li: "u2576004",
                li2: "u2713000",
                li3: "u2713765"
            }
        },
        "phone001": {
            "baidu": {
                li: "u2602491",
                li2: "u2712999",
                li3: "u2713764"
            }
        },
        "phone002": {
            "baidu": {
                li: "u2603236",
                li2: "u2712998",
                li3: "u2713763"
            }
        },
        "pingce": {
            "baidu": {
                li: "u2579312",
                li2: "u2712997",
                li3: "u2713762"
            }
        },
        "qianghongbao": {
            "baidu": {
                li: "u2540058",
                li2: "u2712995",
                li3: "u2713761"
            }
        },
        "qidouh5": {
            "baidu": {
                li: "u2426690",
                li2: "u2712993",
                li3: "u2713760"
            }
        },
        "qishizhushou": {
            "baidu": {
                li: "u2523141",
                li2: "u2712992",
                li3: "u2713759"
            }
        },
        "qixiazi": {
            "baidu": {
                li: "u2421651",
                li2: "u2712991",
                li3: "u2713758"
            }
        },
        "quannengxiangji": {
            "baidu": {
                li: "u2546140",
                li2: "u2712990",
                li3: "u2713757"
            }
        },
        "sangmenhu": {
            "baidu": {
                li: "u2488937",
                li2: "u2712986",
                li3: "u2713756"
            }
        },
        "sdtmeinv": {
            "baidu": {
                li: "u2409621",
                li2: "u2712985",
                li3: "u2713754"
            }
        },
        "shangyewifi": {
            "baidu": {
                li: "u2377702",
                li2: "u2712984",
                li3: "u2713753"
            }
        },
        "shangyewifiliu": {
            "baidu": {
                li: "u2527994",
                li2: "u2712981",
                li3: "u2713751"
            }
        },
        "shangyongwifi": {
            "baidu": {
                li: "u2531944",
                li2: "u2712978",
                li3: "u2713750"
            }
        },
        "shenzhicalculator": {
            "baidu": {
                li: "u2321818",
                li2: "u2712975",
                li3: "u2713748"
            }
        },
        "shenzhishoudiantong": {
            "baidu": {
                li: "u2506071",
                li2: "u2712974",
                li3: "u2713744"
            }
        },
        "shoudiantong": {
            "baidu": {
                li: "u2284359",
                li2: "u2712973",
                li3: "u2713743"
            }
        },
        "shoujibao": {
            "baidu": {
                li: "u2489184",
                li2: "u2712970",
                li3: "u2713742"
            }
        },
        "smcn": {
            "baidu": {
                li: "u2511455",
                li2: "u2712968",
                li3: "u2713741"
            }
        },
        "tianpaibrowser": {
            "baidu": {
                li: "u2386653",
                li2: "u2712967",
                li3: "u2713740"
            }
        },
        "tianyin": {
            "baidu": {
                li: "u2579324",
                li2: "u2712966",
                li3: "u2713739"
            }
        },
        "tianyino": {
            "baidu": {
                li: "u2380587",
                li2: "u2712964",
                li3: "u2713736"
            }
        },
        "tianyiwifi": {
            "baidu": {
                li: "u2329106",
                li2: "u2712962",
                li3: "u2713735"
            }
        },
        "v2345com": {
            "baidu": {
                li: "u2482184",
                li2: "u2712961",
                li3: "u2713733"
            }
        },
        "wangyi": {
            "baidu": {
                li: "u2542920",
                li2: "u2712960",
                li3: "u2713732"
            }
        },
        "weimibrowser": {
            "sogou": {
                li: "562460",
                li2: "562460",
                li3: "562460"
            }
        },
        "weixinfenxiang": {
            "baidu": {
                li: "u2542704",
                li2: "u2712957",
                li3: "u2713729"
            }
        },
        "weixinyidu": {
            "baidu": {
                li: "u2538318",
                li2: "u2712956",
                li3: "u2713728"
            }
        },
        "weixun": {
            "baidu": {
                li: "u2580306",
                li2: "u2712955",
                li3: "u2713726"
            }
        },
        "wenhaushanghai": {
            "baidu": {
                li: "u2572335",
                li2: "u2712953",
                li3: "u2713725"
            }
        },
        "wh001": {
            "baidu": {
                li: "u2464065",
                li2: "u2712952",
                li3: "u2713724"
            }
        },
        "wifibrowser": {
            "baidu": {
                li: "u2390477",
                li2: "u2712951",
                li3: "u2713723"
            }
        },
        "wifichangyou": {
            "baidu": {
                li: "u2550162",
                li2: "u2712950",
                li3: "u2713718"
            }
        },
        "wifichaping": {
            "baidu": {
                li: "u2570432",
                li2: "u2712949",
                li3: "u2713716"
            }
        },
        "wifidianhua": {
            "baidu": {
                li: "u2381050",
                li2: "u2712948",
                li3: "u2713713"
            }
        },
        "wifigongxiangjinglin": {
            "baidu": {
                li: "u2572205",
                li2: "u2712947",
                li3: "u2713711"
            }
        },
        "wifillq": {
            "baidu": {
                li: "u2375047",
                li2: "u2712946",
                li3: "u2713710"
            }
        },
        "wifilwsq": {
            "baidu": {
                li: "u2582156",
                li2: "u2712944",
                li3: "u2713709"
            }
        },
        "wifimima": {
            "baidu": {
                li: "u2570454",
                li2: "u2712943",
                li3: "u2713707"
            }
        },
        "wifitanzhen": {
            "baidu": {
                li: "u2381068",
                li2: "u2712942",
                li3: "u2713705"
            }
        },
        "wifitianyi": {
            "baidu": {
                li: "u2478162",
                li2: "u2712940",
                li3: "u2713704"
            }
        },
        "wifiunion": {
            "baidu": {
                li: "u2365325",
                li2: "u2712939",
                li3: "u2713703"
            }
        },
        "wifiwn": {
            "baidu": {
                li: "u2374441",
                li2: "u2712938",
                li3: "u2713702"
            }
        },
        "wifixh": {
            "baidu": {
                li: "u2292088",
                li2: "u2712937",
                li3: "u2713701"
            }
        },
        "wpswapdh": {
            "baidu": {
                li: "u2593996",
                li2: "u2712936",
                li3: "u2713700"
            }
        },
        "wxgzh": {
            "baidu": {
                li: "u2410915",
                li2: "u2712934",
                li3: "u2713699"
            }
        },
        "xbrowser": {
            "baidu": {
                li: "u2375247",
                li2: "u2712933",
                li3: "u2713697"
            }
        },
        "xiamibrowser": {
            "baidu": {
                li: "u2592402",
                li2: "u2712932",
                li3: "u2713695"
            }
        },
        "yichawang": {
            "baidu": {
                li: "u2498777",
                li2: "u2712931",
                li3: "u2713694"
            }
        },
        "yidongwlan": {
            "baidu": {
                li: "u2570436",
                li2: "u2712930",
                li3: "u2713692"
            }
        },
        "yijianqingli": {
            "baidu": {
                li: "u2570422",
                li2: "u2712929",
                li3: "u2713691"
            }
        },
        "yijianqingli01": {
            "baidu": {
                li: "u2602385",
                li2: "u2712927",
                li3: "u2713687"
            }
        },
        "yingyongguanjia": {
            "baidu": {
                li: "u2594080",
                li2: "u2712924",
                li3: "u2713686"
            }
        },
        "yougoushichang": {
            "baidu": {
                li: "u2442625",
                li2: "u2712922",
                li3: "u2713684"
            }
        },
        "youxindianhua": {
            "baidu": {
                li: "u2360574",
                li2: "u2712921",
                li3: "u2713682"
            }
        },
        "youxindianhuaios": {
            "baidu": {
                li: "u2407588",
                li2: "u2712920",
                li3: "u2713680"
            }
        },
        "yuedongbrowser": {
            "baidu": {
                li: "u2333289",
                li2: "u2712919",
                li3: "u2713678"
            }
        },
        "yuedongquan": {
            "baidu": {
                li: "u2597519",
                li2: "u2712918",
                li3: "u2713677"
            }
        },
        "yuedu": {
            "baidu": {
                li: "u2594093",
                li2: "u2712916",
                li3: "u2713672"
            }
        },
        "yuletoutiao": {
            "baidu": {
                li: "u2410907",
                li2: "u2712915",
                li3: "u2713671"
            }
        },
        "yunyingshang": {
            "baidu": {
                li: "u2594065",
                li2: "u2712914",
                li3: "u2713669"
            }
        },
        "zhangda": {
            "baidu": {
                li: "u2562461",
                li2: "u2712913",
                li3: "u2713667"
            }
        },
        "zhengdiannaozhong": {
            "baidu": {
                li: "u2548276",
                li2: "u2712911",
                li3: "u2713663"
            }
        },
        "zhimeng": {
            "baidu": {
                li: "u2574283",
                li2: "u2712909",
                li3: "u2713662"
            }
        },
        "zhimeng1": {
            "baidu": {
                li: "u2574244",
                li2: "u2712907",
                li3: "u2713661"
            }
        },
        "zhimeng2": {
            "baidu": {
                li: "u2579374",
                li2: "u2712906",
                li3: "u2713659"
            }
        },
        "zhongda": {
            "baidu": {
                li: "u2564480",
                li2: "u2712905",
                li3: "u2713657"
            }
        },
        "zhonghualaohuangi": {
            "baidu": {
                li: "u2574274",
                li2: "u2712904",
                li3: "u2713654"
            }
        },
        "zhwnl": {
            "baidu": {
                li: "u2375056",
                li2: "u2712902",
                li3: "u2713653"
            }
        },
        "zjzy": {
            "baidu": {
                li: "u2462970",
                li2: "u2712899",
                li3: "u2713652"
            }
        },
        "zuimeitianqi": {
            "baidu": {
                li: "u2592419",
                li2: "u2712897",
                li3: "u2713651"
            }
        },
        "null": {
            "baidu": {
                li: "u2196095",
                li2: "u2712895",
                li3: "u2713649"
            }
        },
        "m021_liantongbrowser1": {
            "baidu": {
                li: "u2717149",
                li2: "u2717151",
                li3: "u2717152"
            }
        },
        "m021_liantongbrowser2": {
            "baidu": {
                li: "u2717166",
                li2: "u2717167",
                li3: "u2717168"
            }
        },
        "m021_liantongbrowser3": {
            "baidu": {
                li: "u2717174",
                li2: "u2717178",
                li3: "u2717179"
            }
        },
        "m021_liantongbrowser4": {
            "baidu": {
                li: "u2717187",
                li2: "u2717189",
                li3: "u2717192"
            }
        },
        "m021_liantongbrowser5": {
            "baidu": {
                li: "u2717201",
                li2: "u2717202",
                li3: "u2717203"
            }
        },
        "zhaocaisuo": {
            "baidu": {
                li: "u2717263",
                li2: "u2717264",
                li3: "u2717265"
            }
        },
        "3Druanbao": {
            "baidu": {
                li: "u2718008",
                li2: "u2718018",
                li3: "u2718019"
            }
        },
        "maidong01": {
            "baidu": {
                li: "u2718064",
                li2: "u2718069",
                li3: "u2718072"
            }
        },
        "maidong02": {
            "baidu": {
                li: "u2718076",
                li2: "u2718083",
                li3: "u2718084"
            }
        },
        "renshengrili": {
            "baidu": {
                li: "u2718204",
                li2: "u2718211",
                li3: "u2718212"
            }
        },
        "jingwangllq": {
            "baidu": {
                li: "u2719780",
                li2: "u2719786",
                li3: "u2719787"
            }
        },
        "lemonzhushou": {
            "baidu": {
                li: "u2720140",
                li2: "u2720145",
                li3: "u2720146"
            }
        },
        "liantongbrowser1": {
            "sogou": {
                li: "571798",
                li2: "571798",
                li3: "571798"
            }
        },
        "liantongbrowser2": {
            "sogou": {
                li: "571799",
                li2: "571799",
                li3: "571799"
            }
        },
        "liantongbrowser3": {
            "sogou": {
                li: "571800",
                li2: "571800",
                li3: "571800"
            }
        },
        "hltianqi": {
            "baidu": {
                li: "u2721021",
                li2: "u2721026",
                li3: "u2721027"
            }
        },
        "liantongbrowser5": {
            "baidu": {
                li: "u2721501",
                li2: "u2721507",
                li3: "u2721509"
            }
        }
    }
};

(function(){
	var i = 0,
		ggBaidu = null,
        ggSogou = null,
        ggGdt = null;
	try	{
		// 缓存用户id（365天）
	    GLOBAL.Et.uid = Cookies.get('user_id');
	    if (!GLOBAL.Et.uid) {
	        GLOBAL.Et.uid = (+new Date()) + Math.random().toString(10).substring(2, 6);
	        Cookies.set('user_id', GLOBAL.Et.uid, { expires: 365, path: '/', domain: 'eastday.com' });
	    }
	    // 缓存渠道号（3天）（渠道不存在得情况下使用默认渠道'null'）
	    GLOBAL.Et.qid = GLOBAL.Util.getQueryString('qid') || Cookies.get('qid') || 'null';
	    if (GLOBAL.Et.qid) {
	        Cookies.set('qid', GLOBAL.Et.qid, { expires: 3, path: '/', domain: 'eastday.com' });
	    }
	} catch (e) {
		console.error('set uid and qid has error: \n', e);
	}

	try {

		// 当前渠道广告商数组
	    GLOBAL.Et.ggTypeArr = [];
	    // 当前渠道广告ID数组（渠道无效的情况下使用默认渠道'null'的广告）
	    GLOBAL.Et.gg = GLOBAL.Et.ggData.root[GLOBAL.Et.qid] || GLOBAL.Et.ggData.root['null'];
	    for (i = 0; i < GLOBAL.Et.channelArr.length; i++) {
	        if (GLOBAL.Et.gg && GLOBAL.Et.gg.hasOwnProperty(GLOBAL.Et.channelArr[i])) {
	            GLOBAL.Et.ggTypeArr.push(GLOBAL.Et.channelArr[i]);
	        }
	    }

	    // 对广告ID处理（为了方便获取、判断）
	    ggBaidu = GLOBAL.Et.gg.baidu;
	    ggSogou = GLOBAL.Et.gg.sogou;
	    ggGdt = GLOBAL.Et.gg.gdt;
	    GLOBAL.namespace('GLOBAL.Et.gg.my');
	    // li - baidu/sogou/gdt
	    GLOBAL.Et.gg.my.li = (ggGdt ? (ggGdt.li ? 'gdt_' + ggGdt.li : '') : '') ||
	        (ggBaidu ? (ggBaidu.li ? 'baidu_' + ggBaidu.li : '') : '') ||
	        (ggSogou ? (ggSogou.li ? 'sogou_' + ggSogou.li : '') : '') ||
	        GLOBAL.Et.ggData.root['null'].baidu.li;
	    // li2 - baidu/sogou/gdt
	    GLOBAL.Et.gg.my.li2 = (ggGdt ? (ggGdt.li2 ? 'gdt_' + ggGdt.li2 : '') : '') ||
	        (ggBaidu ? (ggBaidu.li2 ? 'baidu_' + ggBaidu.li2 : '') : '') ||
	        (ggSogou ? (ggSogou.li2 ? 'sogou_' + ggSogou.li2 : '') : '') ||
	        GLOBAL.Et.ggData.root['null'].baidu.li2;
	    // li3 - baidu/sogou/gdt
	    GLOBAL.Et.gg.my.li3 = (ggGdt ? (ggGdt.li3 ? 'gdt_' + ggGdt.li3 : '') : '') ||
	        (ggBaidu ? (ggBaidu.li3 ? 'baidu_' + ggBaidu.li3 : '') : '') ||
	        (ggSogou ? (ggSogou.li3 ? 'sogou_' + ggSogou.li3 : '') : '') ||
	        GLOBAL.Et.ggData.root['null'].baidu.li3;
	} catch (e) {
		console.error('广告处理出现问题: \n', e);
	}

}());




// // 广告渠道数组
// GLOBAL.Et.channelArr  = ['baidu', 'sogou', 'gdt'];

// GLOBAL.Et.qid = GLOBAL.Util.getQueryString('qid') || Cookies.get('qid') || 'null';	// 渠道号

// GLOBAL.Et.ggTypeArr = [];	// 广告商数组
// GLOBAL.Et.gg = GLOBAL.Et.ggData.root[GLOBAL.Et.qid] || GLOBAL.Et.ggData.root['null'];		// 广告ID数组
// for (var i = 0; i < GLOBAL.Et.channelArr.length; i++) {
// 	if(GLOBAL.Et.gg && GLOBAL.Et.gg.hasOwnProperty(GLOBAL.Et.channelArr[i])){
// 		GLOBAL.Et.ggTypeArr.push(GLOBAL.Et.channelArr[i]);
// 	}
// }

// 渠道：lt114116 添加淘宝红包广告
if(GLOBAL.Et.qid === 'lt114116'){
    document.write('<scr' + 'ipt src="//g.alicdn.com/mm/taohb/0.1.3/btn.js" data-unit="px" data-style="right:10,bottom:100" data-size="100" data-type="fixed" data-url="//uland.taobao.com/thb?pid=mm_112599953_11410288_56656977"></scr' + 'ipt>');
}

