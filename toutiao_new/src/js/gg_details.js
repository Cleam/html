/**
 * 详情页广告JS
 * 名称约定：
 *     six: 六宫格广告
 *     threeup： 信息流三宫格广告（靠上）
 *     threedown： 信息流三宫格广告（靠下）
 *     tujia： 图加广告（靠下）
 *     cptop： 插屏 - 顶部横幅
 *     bottom： 信息流广告（末尾）
 *     txt1： 信息流文字链广告1
 *     txt2： 信息流文字链广告2
 *     txt3： 信息流文字链广告3
 *     txt3： 信息流文字链广告3
 *     three： 三宫格广告（wnwifi渠道专用）
 * @deps global.js
 * @author  lizhigao(lizhigao@021.com)
 * @date 2016-06-03
 */
// 创建一个命名空间'Et'
GLOBAL.namespace('Et');
// 广告联盟商（百度、搜狗、广点通）
GLOBAL.Et.channelArr = ['baidu', 'sogou', 'gdt'];
// 广告配置数据
GLOBAL.Et.ggData = {
    'root': {
        'zjzy': {
            'baidu': {
                six: 'u2462973',
                threeup: 'u2462974',
                threedown: 'u2462976'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'zhwnl': {
            'baidu': {
                six: 'u2284037',
                threeup: 'u2375057',
                threedown: 'u2375062',
                tujia: 'u2480208'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'yunyingshang': {
            'baidu': {
                six: 'u2594070',
                threeup: 'u2594071',
                threedown: 'u2594073',
                tujia: 'u2594075',
                cptop: 'u2594076'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'yuedu': {
            'baidu': {
                six: 'u2594095',
                threeup: 'u2594097',
                threedown: 'u2594101',
                tujia: 'u2594104'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'yuedongbrowser': {
            'baidu': {
                six: 'u2333289',
                threeup: 'u2380836',
                threedown: 'u2380838',
                tujia: 'u2546528'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'yonglian': {
            'baidu': {
                six: 'u2615543',
                threeup: 'u2615544',
                threedown: 'u2615545',
                tujia: 'u2615546'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'yingyongguanjia': {
            'baidu': {
                six: 'u2594082',
                threeup: 'u2594084',
                threedown: 'u2594086',
                tujia: 'u2594089',
                cptop: 'u2594091'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'yijianqingli01': {
            'baidu': {
                six: 'u2602386',
                threeup: 'u2602389',
                threedown: 'u2602392',
                tujia: 'u2602395',
                cptop: 'u2602396'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'yijianqingli': {
            'baidu': {
                six: 'u2570421',
                threeup: 'u2570420',
                threedown: 'u2570419',
                tujia: 'u2570466'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'xbrowser': {
            'baidu': {
                six: 'u2327075',
                threeup: 'u2375291',
                threedown: 'u2375293',
                tujia: 'u2546513'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'wpswapdh': {
            'baidu': {
                six: 'u2593999',
                threeup: 'u2594000',
                threedown: 'u2594002'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'wifixh': {
            'baidu': {
                six: 'u2292088',
                threeup: 'u2375108',
                threedown: 'u2375110',
                tujia: 'u2480222'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'wifiunion': {
            'baidu': {
                six: 'u2365325',
                threeup: 'u2381020',
                threedown: 'u2381022',
                tujia: 'u2546533'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'wifitianyi': {
            'baidu': {
                six: 'u2478170',
                threeup: 'u2478172',
                threedown: 'u2478175',
                tujia: 'u2546508'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'wifimima': {
            'baidu': {
                six: 'u2570451',
                threeup: 'u2570446',
                threedown: 'u2570444',
                tujia: 'u2570471'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'wifilwsq': {
            'baidu': {
                six: 'u2582163',
                threeup: 'u2582166',
                threedown: 'u2582169',
                tujia: 'u2582174'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'wifillq': {
            'baidu': {
                six: 'u2284034',
                threeup: 'u2375049',
                threedown: 'u2375050',
                tujia: 'u2480206'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'wifichangyou': {
            'baidu': {
                six: 'u2550164',
                threeup: 'u2550168',
                threedown: 'u2550169',
                tujia: 'u2550171'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'wifibrowser': {
            'baidu': {
                six: 'u2390480',
                threeup: 'u2390482',
                threedown: 'u2390483',
                tujia: 'u2480221'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'weixun': {
            'baidu': {
                six: 'u2580310',
                threeup: 'u2580312',
                threedown: 'u2580315',
                tujia: 'u2580316'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'vivobrowser': {
            'baidu': {
                six: 'u2407604',
                threeup: 'u2407605',
                threedown: 'u2407607'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'tianyiwifi': {
            'baidu': {
                six: 'u2329106',
                threeup: 'u2375377',
                threedown: 'u2375378',
                tujia: 'u2480224'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'tianyino': {
            'baidu': {
                six: 'u2380587',
                threeup: 'u2380591',
                threedown: 'u2380592',
                tujia: 'u2546523'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'tianyin': {
            'baidu': {
                six: 'u2575937',
                threeup: 'u2579336',
                threedown: 'u2579333',
                tujia: 'u2576959',
                cptop: 'u2649539'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'smcn': {
            'baidu': {
                six: 'u2511456',
                threeup: 'u2511457',
                threedown: 'u2511461',
                tujia: 'u2511459'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'shoudiantong': {
            'baidu': {
                six: 'u2284359',
                threeup: 'u2375073',
                threedown: 'u2375077'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'shenzhishoudiantong': {
            'baidu': {
                six: 'u2506074',
                threeup: 'u2506077',
                threedown: 'u2506078',
                cptop: 'u2560793',
                txt1: 'u2590748',
                txt2: 'u2590749',
                txt3: 'u2590751'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'shenzhicalculator': {
            'baidu': {
                six: 'u2321818',
                threeup: 'u2375208',
                threedown: 'u2375210'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'shenghuorili': {
            'baidu': {
                six: 'u2608711',
                threeup: 'u2608740',
                threedown: 'u2608742',
                tujia: 'u2608744',
                cptop: 'u2608749'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'shangyewifiliu': {
            'baidu': {
                six: 'u2527996',
                threeup: 'u2527998',
                threedown: 'u2528000',
                tujia: 'u2528002'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'shangyewifi': {
            'baidu': {
                six: 'u2377702',
                threeup: 'u2381077',
                threedown: 'u2381078'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'quannengxiangji': {
            'baidu': {
                six: 'u2546145',
                threeup: 'u2546146',
                threedown: 'u2546148',
                tujia: 'u2546171'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'qqwechat': {
            'baidu': {
                six: 'u2523613',
                threeup: 'u2523615',
                threedown: 'u2523618',
                tujia: 'u2542998'
            },
            'sogou': {
                bottom: '542154'
            }
        },
        'phone002': {
            'baidu': {
                six: 'u2603239',
                threeup: 'u2603245',
                threedown: 'u2603251',
                tujia: 'u2603254',
                cptop: 'u2603255'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'phone001': {
            'baidu': {
                six: 'u2602494',
                threeup: 'u2602499',
                threedown: 'u2602501',
                tujia: 'u2602505',
                cptop: 'u2602509'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'oppobrowser': {
            'baidu': {
                six: 'u2323755',
                threeup: 'u2375215',
                threedown: 'u2375216'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'ningmengzhuomian': {
            'baidu': {
                six: 'u2449812',
                threeup: 'u2449813',
                threedown: 'u2449815',
                tujia: 'u2477684',
                cptop: 'u2570140',
                txt1: 'u2603762',
                txt2: 'u2603761',
                txt3: 'u2603738'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'moban': {
            'baidu': {
                six: 'u2272386',
                threeup: 'u2371579',
                threedown: 'u2371581'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'meizuliulanqi': {
            'baidu': {
                six: 'u2490020',
                threeup: 'u2490019',
                threedown: 'u2490017',
                tujia: 'u2543319'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'mayibrowser': {
            'baidu': {
                six: 'u2552926',
                threeup: 'u2552928',
                threedown: 'u2552929',
                tujia: 'u2552931'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'maopaobrowser': {
            'baidu': {
                six: 'u2327376',
                threeup: 'u2375315',
                threedown: 'u2375316',
                tujia: 'u2480228'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'm021dh': {
            'baidu': {
                six: 'u2525303',
                threeup: 'u2525305',
                threedown: 'u2525306',
                tujia: 'u2525307'
            },
            'sogou': {
                bottom: '571748'
            }
        },
        'm021apdftdh': {
            'baidu': {
                six: 'u2563714',
                threeup: 'u2563711',
                threedown: 'u2563712',
                tujia: 'u2563710'
            },
            'sogou': {
                bottom: '571748'
            }
        },
        'm021apdft_lc005': {
            'baidu': {
                six: 'u2563706',
                threeup: 'u2563695',
                threedown: 'u2563703',
                tujia: 'u2563692'
            },
            'sogou': {
                bottom: '571748'
            }
        },
        'm021apdft_lc004': {
            'baidu': {
                six: 'u2563683',
                threeup: 'u2563679',
                threedown: 'u2563681',
                tujia: 'u2563677'
            },
            'sogou': {
                bottom: '571748'
            }
        },
        'm021apdft_lc003': {
            'baidu': {
                six: 'u2563669',
                threeup: 'u2563665',
                threedown: 'u2563666',
                tujia: 'u2563661'
            },
            'sogou': {
                bottom: '571748'
            }
        },
        'm021apdft_lc002': {
            'baidu': {
                six: 'u2563656',
                threeup: 'u2563649',
                threedown: 'u2563652',
                tujia: 'u2563647'
            },
            'sogou': {
                bottom: '571748'
            }
        },
        'm021apdft_lc001': {
            'baidu': {
                six: 'u2563595',
                threeup: 'u2563597',
                threedown: 'u2563645',
                tujia: 'u2563643'
            },
            'sogou': {
                bottom: '571748'
            }
        },
        'm021_wy004': {
            'baidu': {
                six: 'u2536111',
                threeup: 'u2536092',
                threedown: 'u2536099',
                tujia: 'u2536556'
            },
            'sogou': {
                bottom: '571748'
            }
        },
        'm021_wy005': {
            'baidu': {
                six: 'u2536120',
                threeup: 'u2536094',
                threedown: 'u2536104',
                tujia: 'u2536562'
            },
            'sogou': {
                bottom: '571748'
            }
        },
        'm021_wy006': {
            'baidu': {
                six: 'u2536125',
                threeup: 'u2536098',
                threedown: 'u2536108',
                tujia: 'u2536566'
            },
            'sogou': {
                bottom: '571748'
            }
        },
        'm021_wy007': {
            'baidu': {
                six: 'u2536132',
                threeup: 'u2536102',
                threedown: 'u2536112',
                tujia: 'u2536570'
            },
            'sogou': {
                bottom: '571748'
            }
        },
        'm021_wy008': {
            'baidu': {
                six: 'u2536136',
                threeup: 'u2536105',
                threedown: 'u2536115',
                tujia: 'u2536575'
            },
            'sogou': {
                bottom: '571748'
            }
        },
        'm021_wy009': {
            'baidu': {
                six: 'u2536140',
                threeup: 'u2536109',
                threedown: 'u2536121',
                tujia: 'u2536583'
            },
            'sogou': {
                bottom: '571748'
            }
        },
        'm021_wy010': {
            'baidu': {
                six: 'u2536143',
                threeup: 'u2536110',
                threedown: 'u2536127',
                tujia: 'u2536586'
            },
            'sogou': {
                bottom: '571748'
            }
        },
        'm021_wy011': {
            'baidu': {
                six: 'u2536146',
                threeup: 'u2536114',
                threedown: 'u2536130',
                tujia: 'u2536590'
            },
            'sogou': {
                bottom: '571748'
            }
        },
        'm021_wy016': {
            'baidu': {
                six: 'u2536166',
                threeup: 'u2536134',
                threedown: 'u2536149',
                tujia: 'u2536609'
            },
            'sogou': {
                bottom: '571748'
            }
        },
        'm021_wy020': {
            'baidu': {
                six: 'u2536179',
                threeup: 'u2536153',
                threedown: 'u2536164',
                tujia: 'u2536633'
            },
            'sogou': {
                bottom: '571748'
            }
        },
        'm021_wy022': {
            'baidu': {
                six: 'u2536192',
                threeup: 'u2536161',
                threedown: 'u2536171',
                tujia: 'u2536639'
            },
            'sogou': {
                bottom: '571748'
            }
        },
        'm021_wy027': {
            'baidu': {
                six: 'u2536208',
                threeup: 'u2536175',
                threedown: 'u2536186',
                tujia: 'u2536659'
            },
            'sogou': {
                bottom: '571748'
            }
        },
        'm021_wy044': {
            'baidu': {
                six: 'u2536273',
                threeup: 'u2536259',
                threedown: 'u2536235',
                tujia: 'u2536545'
            },
            'sogou': {
                bottom: '571748'
            }
        },
        'm021_wy063': {
            'baidu': {
                six: 'u2536349',
                threeup: 'u2536329',
                threedown: 'u2536323',
                tujia: 'u2536660'
            },
            'sogou': {
                bottom: '571748'
            }
        },
        'm021_wy079': {
            'baidu': {
                six: 'u2536426',
                threeup: 'u2536387',
                threedown: 'u2536397',
                tujia: 'u2536599'
            },
            'sogou': {
                bottom: '571748'
            }
        },
        'm021_waitui030': {
            'baidu': {
                six: 'u2602655',
                threeup: 'u2602652',
                threedown: 'u2602650',
                tujia: 'u2602648',
                cptop: 'u2602664'
            },
            'sogou': {
                bottom: '565296'
            }
        },
        'm021_waitui028': {
            'baidu': {
                six: 'u2602636',
                threeup: 'u2602632',
                threedown: 'u2602557',
                tujia: 'u2602629',
                cptop: 'u2602660'
            },
            'sogou': {
                bottom: '565296'
            }
        },
        'm021_waitui027': {
            'baidu': {
                six: 'u2602624',
                threeup: 'u2602622',
                threedown: 'u2602621',
                tujia: 'u2602617',
                cptop: 'u2602658'
            },
            'sogou': {
                bottom: '565296'
            }
        },
        'm021_waitui026': {
            'baidu': {
                six: 'u2602591',
                threeup: 'u2602593',
                threedown: 'u2602595',
                tujia: 'u2602597',
                cptop: 'u2602606'
            },
            'sogou': {
                bottom: '565296'
            }
        },
        'm021_waitui023': {
            'baidu': {
                six: 'u2602569',
                threeup: 'u2602572',
                threedown: 'u2602575',
                tujia: 'u2602576',
                cptop: 'u2602600'
            },
            'sogou': {
                bottom: '565296'
            }
        },
        'm021_waitui021': {
            'baidu': {
                six: 'u2602602',
                threeup: 'u2602596',
                threedown: 'u2602592',
                tujia: 'u2602588',
                cptop: 'u2602668'
            },
            'sogou': {
                bottom: '565296'
            }
        },
        'm021_waitui017': {
            'baidu': {
                six: 'u2540956',
                threeup: 'u2541248',
                threedown: 'u2541307',
                tujia: 'u2541171',
                cptop: 'u2603852'
            },
            'sogou': {
                bottom: '565296'
            }
        },
        'm021_waitui015': {
            'baidu': {
                six: 'u2540952',
                threeup: 'u2541244',
                threedown: 'u2541301',
                tujia: 'u2541178',
                cptop: 'u2603847'
            },
            'sogou': {
                bottom: '565296'
            }
        },
        'm021_waitui011': {
            'baidu': {
                six: 'u2540942',
                threeup: 'u2541233',
                threedown: 'u2541285',
                tujia: 'u2541124',
                cptop: 'u2603835'
            },
            'sogou': {
                bottom: '565296'
            }
        },
        'm021_waitui010': {
            'baidu': {
                six: 'u2540941',
                threeup: 'u2541232',
                threedown: 'u2541283',
                tujia: 'u2541121',
                cptop: 'u2603832'
            },
            'sogou': {
                bottom: '565296'
            }
        },
        'm021_waitui009': {
            'baidu': {
                six: 'u2540939',
                threeup: 'u2541228',
                threedown: 'u2541280',
                tujia: 'u2541076',
                cptop: 'u2603831'
            },
            'sogou': {
                bottom: '565296'
            }
        },
        'm021_waitui008': {
            'baidu': {
                six: 'u2540936',
                threeup: 'u2541226',
                threedown: 'u2541276',
                tujia: 'u2541074',
                cptop: 'u2603827'
            },
            'sogou': {
                bottom: '565296'
            }
        },
        'm021_waitui007': {
            'baidu': {
                six: 'u2540933',
                threeup: 'u2541223',
                threedown: 'u2541275',
                tujia: 'u2541072',
                cptop: 'u2603824'
            },
            'sogou': {
                bottom: '565296'
            }
        },
        'm021_waitui006': {
            'baidu': {
                six: 'u2540932',
                threeup: 'u2541222',
                threedown: 'u2541272',
                tujia: 'u2541070',
                cptop: 'u2603823'
            },
            'sogou': {
                bottom: '565296'
            }
        },
        'm021_waitui005': {
            'baidu': {
                six: 'u2540930',
                threeup: 'u2541218',
                threedown: 'u2541270',
                tujia: 'u2541069',
                cptop: 'u2603820'
            },
            'sogou': {
                bottom: '565296'
            }
        },
        'm021_waitui004': {
            'baidu': {
                six: 'u2540929',
                threeup: 'u2541213',
                threedown: 'u2541267',
                tujia: 'u2541067',
                cptop: 'u2603817'
            },
            'sogou': {
                bottom: '565296'
            }
        },
        'm021_waitui003': {
            'baidu': {
                six: 'u2540928',
                threeup: 'u2541207',
                threedown: 'u2541265',
                tujia: 'u2541066',
                cptop: 'u2603812'
            },
            'sogou': {
                bottom: '565296'
            }
        },
        'm021_waitui002': {
            'baidu': {
                six: 'u2540927',
                threeup: 'u2541205',
                threedown: 'u2541215',
                tujia: 'u2541064',
                cptop: 'u2603808'
            },
            'sogou': {
                bottom: '565296'
            }
        },
        'm021_waitui001': {
            'baidu': {
                six: 'u2540926',
                threeup: 'u2541130',
                threedown: 'u2541212',
                tujia: 'u2541062',
                cptop: 'u2603807'
            },
            'sogou': {
                bottom: '565296'
            }
        },
        'm021_pgzs': {
            'baidu': {
                six: 'u2536082',
                threeup: 'u2536073',
                threedown: 'u2536081',
                tujia: 'u2536538'
            },
            'sogou': {
                bottom: '565296'
            }
        },
        'm021_mbzm': {
            'baidu': {
                six: 'u2536076',
                threeup: 'u2536071',
                threedown: 'u2536080',
                tujia: 'u2536530'
            },
            'sogou': {
                bottom: '571748'
            }
        },
        'm021_gsllq': {
            'baidu': {
                six: 'u2536072',
                threeup: 'u2536069',
                threedown: 'u2536078',
                tujia: 'u2536527'
            },
            'sogou': {
                bottom: '571748'
            }
        },
        'm021_chenz': {
            'baidu': {
                six: 'u2536091',
                threeup: 'u2536077',
                threedown: 'u2536083',
                tujia: 'u2536543'
            },
            'sogou': {
                bottom: '571748'
            }
        },
        'm021': {
            'baidu': {
                six: 'u2536066',
                threeup: 'u2536059',
                threedown: 'u2536075',
                tujia: 'u2536522'
            },
            'sogou': {
                bottom: '571748'
            }
        },
        'lt114116': {
            'baidu': {
                six: 'u2318426',
                threeup: 'u2380768',
                threedown: 'u2380770',
                tujia: 'u2477424',
                cptop: 'u2588867',
                txt1: 'u2590723',
                txt2: 'u2590726',
                txt3: 'u2590728'
            },
            'sogou': {
                bottom: '562458'
            }
        },
        'llmfwifi': {
            'baidu': {
                six: 'u2305445',
                threeup: 'u2375126',
                threedown: 'u2375128'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'liebaoxml': {
            'baidu': {
                six: 'u2585263',
                threeup: 'u2585261',
                threedown: 'u2585260',
                tujia: 'u2585258'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'lianxiangrili': {
            'baidu': {
                six: 'u2533453',
                threeup: 'u2533456',
                threedown: 'u2533457'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'lianxiang114la': {
            'baidu': {
                six: 'u2549480',
                threeup: 'u2549482',
                threedown: 'u2549484',
                tujia: 'u2549486'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'liantongbrowser': {
            'baidu': {
                six: 'u2558101',
                threeup: 'u2558100',
                threedown: 'u2558107',
                tujia: 'u2558109'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'm021_liantongbrowser': {
            'baidu': {
                six: 'u2683571',
                threeup: 'u2683576',
                threedown: 'u2683579',
                tujia: 'u2683894'
            },
            'sogou': {
                bottom: '571748'
            }
        },
        'liangwang': {
            'baidu': {
                six: 'u2508751',
                threeup: 'u2508755',
                threedown: 'u2508760'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'lewuxian': {
            'baidu': {
                six: 'u2579308',
                threeup: 'u2579306',
                threedown: 'u2579299',
                tujia: 'u2579309'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'lemonbrowser': {
            'baidu': {
                six: 'u2327389',
                threeup: 'u2375321',
                threedown: 'u2375324',
                tujia: 'u2477629'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'laohuangli': {
            'baidu': {
                six: 'u2316358',
                threeup: 'u2375171',
                threedown: 'u2375174',
                tujia: 'u2546549'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'laobansuoping': {
            'baidu': {
                six: 'u2592505',
                threeup: 'u2592507',
                threedown: 'u2592509',
                tujia: 'u2592511',
                cptop: 'u2592497'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'lanrentianqi': {
            'baidu': {
                six: 'u2589985',
                threeup: 'u2589994',
                threedown: 'u2590002',
                tujia: 'u2590005'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'kuhuasuoping': {
            'baidu': {
                six: 'u2576938',
                threeup: 'u2576940',
                threedown: 'u2576942',
                tujia: 'u2576946',
                cptop: 'u2588877'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'jsonline2': {
            'baidu': {
                six: 'u2613809',
                threeup: 'u2613811',
                threedown: 'u2613813',
                tujia: 'u2613815',
                cptop: 'u2613816'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'jsonline': {
            'baidu': {
                six: 'u2482176',
                threeup: 'u2482178',
                threedown: 'u2482182',
                tujia: 'u2546502'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'jisuanguanjia': {
            'baidu': {
                six: 'u2404339',
                threeup: 'u2404340',
                threedown: 'u2404342',
                tujia: 'u2546562'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'ioswechat': {
            'baidu': {
                six: 'u2365288',
                threeup: 'u2365291',
                threedown: 'u2365294',
                tujia: 'u2543009'
            },
            'sogou': {
                bottom: '542154'
            }
        },
        'huohoubrowser': {
            'baidu': {
                six: 'u2386621',
                threeup: 'u2386629',
                threedown: 'u2386632'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'huisuoping': {
            'baidu': {
                six: 'u2281081',
                threeup: 'u2371554',
                threedown: 'u2371559'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'hongbaoliulanqi': {
            'baidu': {
                six: 'u2306836',
                threeup: 'u2375163',
                threedown: 'u2375165',
                tujia: 'u2477402'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'haoh5': {
            'baidu': {
                six: 'u2575935',
                threeup: 'u2575934',
                threedown: 'u2575930',
                tujia: 'u2575929'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'hangu': {
            'baidu': {
                six: 'u2596940',
                threeup: 'u2596943',
                threedown: 'u2596946',
                tujia: 'u2596950',
                cptop: 'u2596951'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'guangdianbizhi': {
            'baidu': {
                six: 'u2305439',
                threeup: 'u2375148',
                threedown: 'u2375150',
                tujia: 'u2543321'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'gouwudating': {
            'baidu': {
                six: 'u2585531',
                threeup: 'u2585534',
                threedown: 'u2585540'
            },
            'sogou': {
                bottom: '565291'
            }
        },
        'gioneebrowser': {
            'baidu': {
                six: 'u2332157',
                threeup: 'u2375514',
                threedown: 'u2375516',
                tujia: 'u2480212'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'gaosubrowser': {
            'baidu': {
                six: 'u2367001',
                threeup: 'u2381060',
                threedown: 'u2381063'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'firefox': {
            'baidu': {
                six: 'u2351855',
                threeup: 'u2375529',
                threedown: 'u2375530'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'ewifi9': {
            'baidu': {
                six: 'u2594056',
                threeup: 'u2594057',
                threedown: 'u2594059',
                tujia: 'u2594062',
                cptop: 'u2594063'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'esbrowser': {
            'baidu': {
                six: 'u2316353',
                threeup: 'u2375190',
                threedown: 'u2375191',
                tujia: 'u2546491'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'dfweather': {
            'baidu': {
                six: 'u2525702',
                threeup: 'u2525711',
                threedown: 'u2525713',
                tujia: 'u2525714'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'null': {
            'baidu': {
                six: 'u2370261',
                threeup: 'u2370262',
                threedown: 'u2370263',
                tujia: 'u2547442',
                txt1: 'u2590736',
                txt2: 'u2590737',
                txt3: 'u2590739'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'cvbrowser': {
            'baidu': {
                six: 'u2327364',
                threeup: 'u2375307',
                threedown: 'u2375308'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'coolpadbrowser': {
            'baidu': {
                six: 'u2407596',
                threeup: 'u2407599',
                threedown: 'u2407602',
                tujia: 'u2480198',
                cptop: 'u2588874',
                txt1: 'u2590761',
                txt2: 'u2590763',
                txt3: 'u2590767'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'chenmeng': {
            'baidu': {
                six: 'u2562487',
                threeup: 'u2562490',
                threedown: 'u2562511',
                tujia: 'u2562514'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'chaojiwifi': {
            'baidu': {
                six: 'u2361491',
                threeup: 'u2375614',
                threedown: 'u2375638',
                tujia: 'u2543322',
                cptop: 'u2570150'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'chamusdk': {
            'baidu': {
                six: 'u2597499',
                threeup: 'u2597500',
                threedown: 'u2597503',
                tujia: 'u2597504',
                cptop: 'u2597505'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'chabrowser': {
            'baidu': {
                six: 'u2579385',
                threeup: 'u2579384',
                threedown: 'u2579379',
                tujia: 'u2579388'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'bodaophone': {
            'baidu': {
                six: 'u2503288',
                threeup: 'u2503286',
                threedown: 'u2503284',
                tujia: 'u2543332'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'beiguaphone': {
            'baidu': {
                six: 'u2580651',
                threeup: 'u2580654',
                threedown: 'u2580658',
                tujia: 'u2580662'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'bdxml': {
            'baidu': {
                six: 'u2585277',
                threeup: 'u2585273',
                threedown: 'u2585271',
                tujia: 'u2585270'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'apdft_lc005': {
            'baidu': {
                six: 'u2563706',
                threeup: 'u2563695',
                threedown: 'u2563703'
            },
            'sogou': {
                bottom: '571748'
            }
        },
        'apdft_lc004': {
            'baidu': {
                six: 'u2563683',
                threeup: 'u2563679',
                threedown: 'u2563681'
            },
            'sogou': {
                bottom: '571748'
            }
        },
        'apdft_lc003': {
            'baidu': {
                six: 'u2563669',
                threeup: 'u2563665',
                threedown: 'u2563666'
            },
            'sogou': {
                bottom: '571748'
            }
        },
        'apdft_lc002': {
            'baidu': {
                six: 'u2563656',
                threeup: 'u2563649',
                threedown: 'u2563652'
            },
            'sogou': {
                bottom: '571748'
            }
        },
        'apdft_lc001': {
            'baidu': {
                six: 'u2563595',
                threeup: 'u2563597',
                threedown: 'u2563645'
            },
            'sogou': {
                bottom: '571748'
            }
        },
        'aoyouie': {
            'baidu': {
                six: 'u2615535',
                threeup: 'u2615536',
                threedown: 'u2615537',
                tujia: 'u2615538',
                cptop: 'u2615539'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'anzhuohongbao': {
            'baidu': {
                six: 'u2428349',
                threeup: 'u2428351',
                threedown: 'u2428352'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'androidesk': {
            'baidu': {
                six: 'u2327356',
                threeup: 'u2375300',
                threedown: 'u2375302'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'aishangbrowser': {
            'baidu': {
                six: 'u2383940',
                threeup: 'u2383941',
                threedown: 'u2383942'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'aigao': {
            'baidu': {
                six: 'u2383944',
                threeup: 'u2383947',
                threedown: 'u2383948',
                tujia: 'u2480216'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        '678plus': {
            'baidu': {
                six: 'u2472723',
                threeup: 'u2472725',
                threedown: 'u2472727',
                tujia: 'u2547432'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        '51shoujizhushou': {
            'baidu': {
                six: 'u2449818',
                threeup: 'u2449819',
                threedown: 'u2449820',
                tujia: 'u2546489'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        '4gbrowser': {
            'baidu': {
                six: 'u2319240',
                threeup: 'u2380773',
                threedown: 'u2380774',
                tujia: 'u2614045',
                cptop: 'u2614040'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        '2345yuki': {
            'baidu': {
                six: 'u2292902',
                threeup: 'u2370841',
                threedown: 'u2370844',
                tujia: 'u2477712'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        '10086wy': {
            'baidu': {
                six: 'u2426685',
                threeup: 'u2426686',
                threedown: 'u2426687',
                tujia: 'u2477619',
                cptop: 'u2588870',
                txt1: 'u2590742',
                txt2: 'u2590743',
                txt3: 'u2590745'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        '021dh': {
            'baidu': {
                six: 'u2530682',
                threeup: 'u2530687',
                threedown: 'u2530689'
            },
            'sogou': {
                bottom: '571748'
            }
        },
        '2345m': {
            'baidu': {
                six: 'u2607887',
                threeup: 'u2607889',
                threedown: 'u2607890'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'wifijl': {
            'baidu': {
                six: 'u2610558',
                threeup: 'u2610561',
                threedown: 'u2610565',
                tujia: 'u2610567'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'jrtt': {
            'baidu': {
                six: 'u2612532',
                threeup: 'u2612533',
                threedown: 'u2612536',
                tujia: 'u2612543',
                cptop: 'u2612545'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        '114mobileios': {
            'baidu': {
                six: 'u2610230',
                threeup: 'u2610253',
                threedown: 'u2610254',
                tujia: 'u2610257',
                cptop: 'u2610334'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        '114mobile': {
            'baidu': {
                six: 'u2610264',
                threeup: 'u2610270',
                threedown: 'u2610276',
                tujia: 'u2610288',
                cptop: 'u2610335'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'renrensuoping': {
            'baidu': {
                six: 'u2618184',
                threeup: 'u2618188',
                threedown: 'u2618190',
                tujia: 'u2618192',
                cptop: 'u2618194'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'yijianqinglidashi03': {
            'baidu': {
                six: 'u2622822',
                threeup: 'u2622825',
                threedown: 'u2622827',
                tujia: 'u2622829',
                cptop: 'u2622888'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'hongbaokuaishou': {
            'baidu': {
                six: 'u2628443',
                threeup: 'u2628446',
                threedown: 'u2628445',
                tujia: 'u2628448',
                cptop: 'u2628450'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'jiuyi160': {
            'baidu': {
                six: 'u2634492',
                threeup: 'u2634488',
                threedown: 'u2634491',
                tujia: 'u2634484',
                cptop: 'u2634497'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'qiaohuiwangluo': {
            'baidu': {
                six: 'u2634677',
                threeup: 'u2634682',
                threedown: 'u2634678',
                tujia: 'u2634683'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'mzol': {
            'baidu': {
                six: 'u2635727',
                threeup: 'u2635721',
                threedown: 'u2635724',
                tujia: 'u2635712',
                cptop: 'u2635726'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'yijianqinglidashi': {
            'baidu': {
                six: 'u2635947',
                threeup: 'u2635953',
                threedown: 'u2635950',
                tujia: 'u2635955',
                cptop: 'u2635957'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'chubaophone': {
            'baidu': {
                six: 'u2636095',
                threeup: 'u2636090',
                threedown: 'u2636094',
                tujia: 'u2636089',
                cptop: 'u2636096'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'm021_hyx001': {
            'baidu': {
                six: 'u2636104',
                threeup: 'u2636108',
                threedown: 'u2636106',
                tujia: 'u2636110',
                cptop: 'u2636112'
            },
            'sogou': {
                bottom: '571748'
            }
        },
        'm021_hyx002': {
            'baidu': {
                six: 'u2636114',
                threeup: 'u2636119',
                threedown: 'u2636115',
                tujia: 'u2636120',
                cptop: 'u2636121'
            },
            'sogou': {
                bottom: '571748'
            }
        },
        'm021_hyx003': {
            'baidu': {
                six: 'u2636626',
                threeup: 'u2636688',
                threedown: 'u2636647',
                tujia: 'u2636630',
                cptop: 'u2637153'
            },
            'sogou': {
                bottom: '571748'
            }
        },
        'm021_hyx004': {
            'baidu': {
                six: 'u2636700',
                threeup: 'u2636714',
                threedown: 'u2636705',
                tujia: 'u2636721',
                cptop: 'u2636724'
            },
            'sogou': {
                bottom: '571748'
            }
        },
        'm021_hyx005': {
            'baidu': {
                six: 'u2636726',
                threeup: 'u2636731',
                threedown: 'u2636728',
                tujia: 'u2636732',
                cptop: 'u2636733'
            },
            'sogou': {
                bottom: '571748'
            }
        },
        'm021_hyx006': {
            'baidu': {
                six: 'u2636737',
                threeup: 'u2636759',
                threedown: 'u2636746',
                tujia: 'u2636762',
                cptop: 'u2636767'
            },
            'sogou': {
                bottom: '571748'
            }
        },
        'm021_hyx007': {
            'baidu': {
                six: 'u2636774',
                threeup: 'u2636784',
                threedown: 'u2636776',
                tujia: 'u2636786',
                cptop: 'u2636787'
            },
            'sogou': {
                bottom: '571748'
            }
        },
        '511dianying': {
            'baidu': {
                six: 'u2636913',
                threeup: 'u2636925',
                threedown: 'u2636919',
                tujia: 'u2636926',
                cptop: 'u2636927'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'youxinh5': {
            'baidu': {
                six: 'u2637035',
                threeup: 'u2637046',
                threedown: 'u2637040',
                tujia: 'u2637048',
                cptop: 'u2637051'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'laokgame ': {
            'baidu': {
                six: 'u2637442',
                threeup: 'u2637446',
                threedown: 'u2637444',
                tujia: 'u2637447',
                cptop: 'u2637450'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'wpsios': {
            'baidu': {
                six: 'u2637968',
                threeup: 'u2637993',
                threedown: 'u2637974',
                tujia: 'u2638010',
                cptop: 'u2638003'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'ucllqsun': {
            'baidu': {
                six: 'u2638677',
                threeup: 'u2638682',
                threedown: 'u2638678',
                tujia: 'u2638685'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'zhuanyidou': {
            'baidu': {
                six: 'u2640990',
                threeup: 'u2640986',
                threedown: 'u2640988',
                tujia: 'u2640981',
                cptop: 'u2640985'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'taosuoping': {
            'baidu': {
                six: 'u2641077',
                threeup: 'u2641082',
                threedown: 'u2641078',
                tujia: 'u2641081'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'jinlisun': {
            'baidu': {
                six: 'u2641151',
                threeup: 'u2641139',
                threedown: 'u2641149',
                tujia: 'u2641141'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'zhanglida': {
            'baidu': {
                six: 'u2642797',
                threeup: 'u2642793',
                threedown: 'u2642795',
                tujia: 'u2642802',
                cptop: 'u2642805'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'ucllqsun01': {
            'baidu': {
                six: 'u2648133',
                threeup: 'u2648214',
                threedown: 'u2648154',
                tujia: 'u2648219'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'ljbrowser': {
            'baidu': {
                six: 'u2648221',
                threeup: 'u2648232',
                threedown: 'u2648222'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'tiantianrj': {
            'baidu': {
                six: 'u2648329',
                threeup: 'u2648338',
                threedown: 'u2648330',
                tujia: 'u2648340'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'aishangwifi': {
            'baidu': {
                six: 'u2648363',
                threeup: 'u2648381',
                threedown: 'u2648369',
                tujia: 'u2648384'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'shujuan': {
            'baidu': {
                six: 'u2648393',
                threeup: 'u2648405',
                threedown: 'u2648396',
                tujia: 'u2648422'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'hjjingling': {
            'baidu': {
                six: 'u2646230',
                threeup: 'u2646227',
                threedown: 'u2646229',
                tujia: 'u2646234',
                cptop: 'u2646236'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'yuedu1': {
            'baidu': {
                six: 'u2648568',
                threeup: 'u2648603',
                threedown: 'u2648594',
                tujia: 'u2648609'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'yuedu2': {
            'baidu': {
                six: 'u2648620',
                threeup: 'u2648666',
                threedown: 'u2648654',
                tujia: 'u2648700'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'yuedu3': {
            'baidu': {
                six: 'u2648721',
                threeup: 'u2648748',
                threedown: 'u2648723',
                tujia: 'u2648757'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'yuedu4': {
            'baidu': {
                six: 'u2648774',
                threeup: 'u2648795',
                threedown: 'u2648776',
                tujia: 'u2648801'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'yuedu5': {
            'baidu': {
                six: 'u2648803',
                threeup: 'u2648816',
                threedown: 'u2648808',
                tujia: 'u2648819'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'yjqlds01': {
            'baidu': {
                six: 'u2649287',
                threeup: 'u2649280',
                threedown: 'u2649285',
                tujia: 'u2649271',
                cptop: 'u2649272'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'ucllqsun02': {
            'baidu': {
                six: 'u2649522',
                threeup: 'u2649533',
                threedown: 'u2649523',
                tujia: 'u2649535'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'ucllqsun03': {
            'baidu': {
                six: 'u2649536',
                threeup: 'u2649544',
                threedown: 'u2649540',
                tujia: 'u2649546'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'shujuan01': {
            'baidu': {
                six: 'u2649854',
                threeup: 'u2649901',
                threedown: 'u2649897',
                tujia: 'u2649907',
                cptop: 'u2649908'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'm021_myworld': {
            'baidu': {
                six: 'u2652098',
                threeup: 'u2652109',
                threedown: 'u2652103',
                tujia: 'u2652112'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'uckuzhan': {
            'baidu': {
                six: 'u2652121',
                threeup: 'u2652125',
                threedown: 'u2652122',
                tujia: 'u2652126'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'haixunyidong': {
            'baidu': {
                six: 'u2654112',
                threeup: 'u2654119',
                threedown: 'u2654114',
                tujia: 'u2654123',
                cptop: 'u2649908'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'wdcx': {
            'baidu': {
                six: 'u2656508',
                threeup: 'u2656513',
                threedown: 'u2656509',
                tujia: 'u2656514',
                cptop: 'u2656515'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'wdcx01': {
            'baidu': {
                six: 'u2658901',
                threeup: 'u2658904',
                threedown: 'u2658902',
                tujia: 'u2658907',
                cptop: 'u2658912'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'm021_gsbrowser_install': {
            'baidu': {
                six: 'u2659934',
                threeup: 'u2659938',
                threedown: 'u2659935',
                tujia: 'u2659942'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'gsbrowser': {
            'baidu': {
                six: 'u2429963',
                threeup: 'u2429964',
                threedown: 'u2429965',
                tujia: 'u2659924'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'm021_gsbrowser': {
            'baidu': {
                six: 'u2683562',
                threeup: 'u2683563',
                threedown: 'u2683564',
                tujia: 'u2683893'
            },
            'sogou': {
                bottom: '571748'
            }
        },
        'lianxianglvcha': {
            'baidu': {
                six: 'u2659955',
                threeup: 'u2659958',
                threedown: 'u2659956',
                tujia: 'u2659959',
                cptop: 'u2659961'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'juheshuju': {
            'baidu': {
                six: 'u2659964',
                threeup: 'u2659973',
                threedown: 'u2659967'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'yousu': {
            'baidu': {
                six: 'u2661384',
                threeup: 'u2661383',
                threedown: 'u2661386',
                tujia: 'u2661149',
                cptop: 'u2661160'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'm021_waitui035': {
            'baidu': {
                six: 'u2607285',
                tujia: 'u2607326',
                cptop: 'u2607344'
            },
            'sogou': {
                bottom: '565296'
            }
        },
        'm021_waitui034': {
            'baidu': {
                six: 'u2607363',
                tujia: 'u2607290',
                cptop: 'u2607342'
            },
            'sogou': {
                bottom: '565296'
            }
        },
        'm021_waitui033': {
            'baidu': {
                six: 'u2607299',
                tujia: 'u2607284',
                cptop: 'u2607341'
            },
            'sogou': {
                bottom: '565296'
            }
        },
        'm021_waitui032': {
            'baidu': {
                six: 'u2607287',
                tujia: 'u2607281',
                cptop: 'u2607336'
            },
            'sogou': {
                bottom: '565296'
            }
        },
        'm021_waitui031': {
            'baidu': {
                six: 'u2607321',
                tujia: 'u2607279',
                cptop: 'u2607334'
            },
            'sogou': {
                bottom: '565296'
            }
        },
        'wnwifi': {
            'baidu': {
                three: 'u2506827'
            },
            'sogou': {
                three: '565293'
            }
        },
        'weimibrowser': {
            'sogou': {
                six: '562460',
                threeup: '562460',
                threedown: '562460',
                bottom: '562460'
            }
        },
        'm021_wy001': {
            'baidu': {
                six: 'u2536095',
                threeup: 'u2536079',
                threedown: 'u2536089',
                tujia: 'u2536546'
            },
            'sogou': {
                bottom: '571748'
            }
        },
        'm021_wy002': {
            'baidu': {
                six: 'u2536100',
                threeup: 'u2536084',
                threedown: 'u2536093',
                tujia: 'u2536549'
            },
            'sogou': {
                bottom: '571748'
            }
        },
        'm021_wy047': {
            'baidu': {
                six: 'u2536287',
                threeup: 'u2536269',
                threedown: 'u2536250',
                tujia: 'u2536558'
            },
            'sogou': {
                bottom: '571748'
            }
        },
        'm021_wy083': {
            'baidu': {
                six: 'u2536443',
                threeup: 'u2536407',
                threedown: 'u2536418',
                tujia: 'u2536618'
            },
            'sogou': {
                bottom: '571748'
            }
        },
        'baiducom': {
            'baidu': {
                six: 'u2511452',
                threeup: 'u2511450',
                threedown: 'u2511463',
                tujia: 'u2511454'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        '28app': {
            'sogou': {
                six: '562456',
                threeup: '562456',
                threedown: '562456',
                bottom: '562456'
            }
        },
        'baidubrowser': {
            'baidu': {
                six: 'u2666264',
                threeup: 'u2666265',
                threedown: 'u2666266',
                tujia: 'u2666269'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'xiaomi': {
            'baidu': {
                six: 'u2666304',
                threeup: 'u2666302',
                threedown: 'u2666301',
                tujia: 'u2666300'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'chubao': {
            'baidu': {
                six: 'u2666373',
                threeup: 'u2666372',
                threedown: 'u2666370'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'jsonline1': {
            'baidu': {
                six: 'u2594035',
                threeup: 'u2594038',
                threedown: 'u2594042',
                cptop: 'u2594048',
                tujia: 'u2594046'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'jsonline3': {
            'baidu': {
                six: 'u2668904',
                threeup: 'u2668903',
                threedown: 'u2668901',
                cptop: 'u2668898',
                tujia: 'u2668899'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'jsonline4': {
            'baidu': {
                six: 'u2668984',
                threeup: 'u2668983',
                threedown: 'u2668982',
                cptop: 'u2668980',
                tujia: 'u2668981'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'jsonline5': {
            'baidu': {
                six: 'u2668991',
                threeup: 'u2668990',
                threedown: 'u2668989',
                cptop: 'u2668987',
                tujia: 'u2669526'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'tianyizone': {
            'baidu': {
                six: 'u2669316',
                threeup: 'u2669314',
                threedown: 'u2669313',
                tujia: 'u2669311'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'movietiantang': {
            'baidu': {
                six: 'u2669401',
                threeup: 'u2669400',
                threedown: 'u2669395',
                cptop: 'u2669393',
                tujia: 'u2669398'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'youxinapp': {
            'baidu': {
                six: 'u2671417',
                threeup: 'u2671416',
                threedown: 'u2671415'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'weixinfxzf': {
            'baidu': {
                six: 'u2671613',
                threeup: 'u2671612',
                threedown: 'u2671609',
                tujia: 'u2671608',
                cptop: 'u2671616'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'daping': {
            'baidu': {
                six: 'u2671810',
                threeup: 'u2671804',
                threedown: 'u2671803',
                tujia: 'u2671799',
                cptop: 'u2671813'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'qqbrowser': {
            'gdt': {
                six: '2050819280187107',
                bottom: '5000111220584129'
            }
        },
        '678sjdh': {
            'baidu': {
                six: 'u2672656',
                threeup: 'u2672658',
                threedown: 'u2672661',
                tujia: 'u2672664',
                cptop: 'u2672674'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'm021_wy050': {
            'baidu': {
                six: 'u2536300',
                threeup: 'u2536278',
                threedown: 'u2536264',
                tujia: 'u2536574'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'm021_wy012': {
            'baidu': {
                six: 'u2536150',
                threeup: 'u2536118',
                threedown: 'u2536133',
                tujia: 'u2536594'
            },
            'sogou': {
                bottom: '571748'
            }
        },
        'm021_wy013': {
            'baidu': {
                six: 'u2673208',
                threeup: 'u2673206',
                threedown: 'u2673205',
                tujia: 'u2673204'
            },
            'sogou': {
                bottom: '571748'
            }
        },
        'weimipush': {
            'sogou': {
                six: '571749',
                threeup: '571749',
                threedown: '571749',
                bottom: '542151'
            }
        },
        'zhongyangtianqi': {
            'baidu': {
                six: 'u2674303',
                threeup: 'u2674302',
                threedown: 'u2674301',
                tujia: 'u2674299',
                cptop: 'u2674306'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'xianguo': {
            'baidu': {
                six: 'u2674287',
                threeup: 'u2674286',
                threedown: 'u2674284'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'qiaohuiwangluomm': {
            'baidu': {
                six: 'u2674378',
                tujia: 'u2674376'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'shujuan06': {
            'baidu': {
                six: 'u2674450',
                threeup: 'u2674449',
                threedown: 'u2674448',
                tujia: 'u2674447',
                cptop: 'u2674452'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'shujuan05': {
            'baidu': {
                six: 'u2674443',
                threeup: 'u2674442',
                threedown: 'u2674441',
                tujia: 'u2674439',
                cptop: 'u2674438'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'shujuan04': {
            'baidu': {
                six: 'u2674434',
                threeup: 'u2674433',
                threedown: 'u2674432',
                tujia: 'u2674431',
                cptop: 'u2674437'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'shujuan03': {
            'baidu': {
                six: 'u2674429',
                threeup: 'u2674427',
                threedown: 'u2674426',
                tujia: 'u2674425',
                cptop: 'u2674423'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'shujuan02': {
            'baidu': {
                six: 'u2674420',
                threeup: 'u2674418',
                threedown: 'u2674417',
                tujia: 'u2674416',
                cptop: 'u2674422'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        '360so': {
            'baidu': {
                six: 'u2624223',
                threeup: 'u2624224',
                threedown: 'u2624222',
                tujia: 'u2624221'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'sogoucom': {
            'baidu': {
                six: 'u2624257',
                threeup: 'u2624260',
                threedown: 'u2624266',
                tujia: 'u2624268'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'wutongwifi': {
            'baidu': {
                six: 'u2675981',
                threeup: 'u2675980',
                threedown: 'u2675979',
                tujia: 'u2675978',
                cptop: 'u2675983'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'aishang': {
            'baidu': {
                six: 'u2675533',
                threeup: 'u2675532',
                threedown: 'u2675531'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'boxmarket': {
            'baidu': {
                six: 'u2675815',
                threeup: 'u2675813',
                threedown: 'u2675812',
                tujia: 'u2675810',
                cptop: 'u2675809'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'duotuo': {
            'baidu': {
                six: 'u2675802',
                threeup: 'u2675801',
                threedown: 'u2675799',
                tujia: 'u2675798',
                cptop: 'u2675808'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'xiaobowifi': {
            'baidu': {
                six: 'u2675859',
                threeup: 'u2675857',
                threedown: 'u2675856',
                tujia: 'u2675852',
                cptop: 'u2675851'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'appylm': {
            'baidu': {
                six: 'u2678137',
                threeup: 'u2678136',
                threedown: 'u2678135',
                tujia: 'u2678134',
                cptop: 'u2678140'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'qiaohuiwangluo01': {
            'baidu': {
                six: 'u2678181',
                threeup: 'u2678179',
                threedown: 'u2678178',
                tujia: 'u2678177',
                cptop: 'u2678183'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'coolpadbrowser01': {
            'baidu': {
                six: 'u2678416',
                threeup: 'u2678413',
                threedown: 'u2678412',
                tujia: 'u2678411'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'dopah5': {
            'baidu': {
                six: 'u2679923',
                threeup: 'u2679920',
                threedown: 'u2679919',
                tujia: 'u2679917'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'xltianqitong': {
            'baidu': {
                six: 'u2680056',
                threeup: 'u2680055',
                threedown: 'u2680054',
                tujia: 'u2680053'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'wifixhwy': {
            'baidu': {
                six: 'u2627268',
                threeup: 'u2627274',
                threedown: 'u2627271',
                tujia: 'u2627276',
                cptop: 'u2627263'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'yiwanwuxian': {
            'baidu': {
                six: 'u2681177',
                threeup: 'u2681176',
                threedown: 'u2681174',
                tujia: 'u2681173',
                cptop: 'u2681179'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'uckuzhanjk': {
            'baidu': {
                six: 'u2681197',
                threeup: 'u2681196',
                threedown: 'u2681195',
                tujia: 'u2681194'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'operabrower': {
            'baidu': {
                six: 'u2455284',
                threeup: 'u2455287',
                threedown: 'u2455289',
                tujia: 'u2682281'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'sqzhushou': {
            'baidu': {
                six: 'u2682463',
                threeup: 'u2682460',
                threedown: 'u2682459',
                tujia: 'u2682457',
                cptop: 'u2682466'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'gxt': {
            'baidu': {
                six: 'u2683283',
                threeup: 'u2683282',
                threedown: 'u2683281',
                tujia: 'u2683280',
                cptop: 'u2683286'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        '8684': {
            'baidu': {
                six: 'u2356214',
                threeup: 'u2375590',
                threedown: 'u2375591',
                tujia: 'u2546598'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        '16wifi': {
            'baidu': {
                six: 'u2683573',
                threeup: 'u2683567',
                threedown: 'u2683566',
                tujia: 'u2683565',
                cptop: 'u2683575'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'huituikeji': {
            'baidu': {
                six: 'u2670436',
                threeup: 'u2670438',
                threedown: 'u2670441',
                tujia: 'u2670443',
                cptop: 'u2670444'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        '10086mz': {
            'baidu': {
                six: 'u2670471',
                threeup: 'u2670473',
                threedown: 'u2670475',
                tujia: 'u2670477'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'qiaohuiwangluo02': {
            'baidu': {
                six: 'u2683718',
                threeup: 'u2683717',
                threedown: 'u2683716',
                tujia: 'u2683715',
                cptop: 'u2683714'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        '6789search': {
            'baidu': {
                six: 'u2683711',
                threeup: 'u2683710',
                threedown: 'u2683707',
                tujia: 'u2683706'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'gsbrowser_website': {
            'baidu': {
                six: 'u2685596',
                threeup: 'u2685595',
                threedown: 'u2685594',
                tujia: 'u2685593'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'gsbrowser_360': {
            'baidu': {
                six: 'u2685605',
                threeup: 'u2685604',
                threedown: 'u2685602',
                tujia: 'u2685617'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'gsbrowser_huawei': {
            'baidu': {
                six: 'u2685623',
                threeup: 'u2685621',
                threedown: 'u2685620',
                tujia: 'u2685619'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'gsbrowser_taobao': {
            'baidu': {
                six: 'u2685634',
                threeup: 'u2685633',
                threedown: 'u2685630',
                tujia: 'u2685628'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'gsbrowser_noad': {
            'baidu': {
                six: 'u2685690',
                threeup: 'u2685694',
                threedown: 'u2685695',
                tujia: 'u2685697'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'gsbrowser_QQ': {
            'baidu': {
                six: 'u2685654',
                threeup: 'u2685653',
                threedown: 'u2685651',
                tujia: 'u2685649'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'gsbrowser_nearme': {
            'baidu': {
                six: 'u2685664',
                threeup: 'u2685662',
                threedown: 'u2685659',
                tujia: 'u2685657'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'gsbrowser_baidu': {
            'baidu': {
                six: 'u2685670',
                threeup: 'u2685671',
                threedown: 'u2685672',
                tujia: 'u2685674'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'gsbrowser_appChina': {
            'baidu': {
                six: 'u2685685',
                threeup: 'u2685683',
                threedown: 'u2685680',
                tujia: 'u2685678'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'gsbrowser_wandoujia': {
            'baidu': {
                six: 'u2685708',
                threeup: 'u2685707',
                threedown: 'u2685704',
                tujia: 'u2685702'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'gsbrowser_vivo': {
            'baidu': {
                six: 'u2685715',
                threeup: 'u2685716',
                threedown: 'u2685718',
                tujia: 'u2685719'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'gsbrowser_sogou': {
            'baidu': {
                six: 'u2685727',
                threeup: 'u2685726',
                threedown: 'u2685723',
                tujia: 'u2685722'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'gsbrowser_gfan': {
            'baidu': {
                six: 'u2685735',
                threeup: 'u2685737',
                threedown: 'u2685738',
                tujia: 'u2685740'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'gsbrowser_lenovo': {
            'baidu': {
                six: 'u2685749',
                threeup: 'u2685747',
                threedown: 'u2685744',
                tujia: 'u2685742'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'gsbrowser_flyme': {
            'baidu': {
                six: 'u2685798',
                threeup: 'u2685800',
                threedown: 'u2685802',
                tujia: 'u2685818'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'gsbrowser_tpin': {
            'baidu': {
                six: 'u2685807',
                threeup: 'u2685809',
                threedown: 'u2685811',
                tujia: 'u2685813'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'gsbrowser_mumayi': {
            'baidu': {
                six: 'u2685793',
                threeup: 'u2685794',
                threedown: 'u2685796',
                tujia: 'u2685799'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'gsbrowser_liqu': {
            'baidu': {
                six: 'u2685774',
                threeup: 'u2685781',
                threedown: 'u2685783',
                tujia: 'u2685816'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'pc6_duowanmyworldhezi': {
            'baidu': {
                six: 'u2685777',
                threeup: 'u2685782',
                threedown: 'u2685784',
                tujia: 'u2685788'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'pc6_findsomething': {
            'baidu': {
                six: 'u2685763',
                threeup: 'u2685764',
                threedown: 'u2685768',
                tujia: 'u2685770'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'pc6_huoyingzhanji': {
            'baidu': {
                six: 'u2685753',
                threeup: 'u2685756',
                threedown: 'u2685758',
                tujia: 'u2685760'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'pc6_myworld': {
            'baidu': {
                six: 'u2685734',
                threeup: 'u2685739',
                threedown: 'u2685741',
                tujia: 'u2685746'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'pc6_shaobingxiugaiqi': {
            'baidu': {
                six: 'u2685714',
                threeup: 'u2685717',
                threedown: 'u2685720',
                tujia: 'u2685724'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'pc6_wanglingshashou': {
            'baidu': {
                six: 'u2685696',
                threeup: 'u2685698',
                threedown: 'u2685700',
                tujia: 'u2685706'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'pc6_zhongguoxiangqi': {
            'baidu': {
                six: 'u2685675',
                threeup: 'u2685679',
                threedown: 'u2685684',
                tujia: 'u2685687'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'mobileqq_QQ': {
            'baidu': {
                six: 'u2685660',
                threeup: 'u2685663',
                threedown: 'u2685666',
                tujia: 'u2685668'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'gsbrowser_myworld': {
            'baidu': {
                six: 'u2685645',
                threeup: 'u2685648',
                threedown: 'u2685650',
                tujia: 'u2685652'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'myworld': {
            'baidu': {
                six: 'u2685624',
                threeup: 'u2685627',
                threedown: 'u2685629',
                tujia: 'u2685631'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'gsbrowser_wali': {
            'baidu': {
                six: 'u2685614',
                threeup: 'u2685616',
                threedown: 'u2685618',
                tujia: 'u2685635'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'gsbrowser_install': {
            'baidu': {
                six: 'u2685560',
                threeup: 'u2685558',
                threedown: 'u2685557',
                tujia: 'u2685556'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'liantongbrowser_gaokao': {
            'baidu': {
                six: 'u2685924',
                threeup: 'u2685926',
                threedown: 'u2685929',
                tujia: 'u2685933'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'sogourecih5': {
            'baidu': {
                six: 'u2686879',
                threeup: 'u2686877',
                threedown: 'u2686876'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'mingnian': {
            'baidu': {
                six: 'u2687293',
                threeup: 'u2687292',
                threedown: 'u2687291'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'shengming': {
            'baidu': {
                six: 'u2687299',
                threeup: 'u2687298',
                threedown: 'u2687297'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'oupengllqz': {
            'baidu': {
                six: 'u2687306',
                threeup: 'u2687305',
                threedown: 'u2687303'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'hangu01': {
            'baidu': {
                six: 'u2687385',
                threeup: 'u2687384',
                threedown: 'u2687380',
                tujia: 'u2687378'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'fenxiangapp': {
            'baidu': {
                six: 'u2687581',
                threeup: 'u2687579',
                threedown: 'u2687578',
                tujia: 'u2687576'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'dianxin404': {
            'baidu': {
                six: 'u2688051',
                threeup: 'u2688050',
                threedown: 'u2688049',
                tujia: 'u2688048'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'yangsheng': {
            'baidu': {
                six: 'u2689092',
                threeup: 'u2689091',
                threedown: 'u2689090',
                tujia: 'u2689087'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'zhicheng': {
            'baidu': {
                six: 'u2689379',
                threeup: 'u2689378',
                threedown: 'u2689377',
                tujia: 'u2689376'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'sgdhtt': {
            'baidu': {
                six: 'u2689497',
                threeup: 'u2689495',
                threedown: 'u2689494',
                tujia: 'u2689493'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'sgdhjs': {
            'baidu': {
                six: 'u2689514',
                threeup: 'u2689513',
                threedown: 'u2689510',
                tujia: 'u2689503'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'sgdhsh': {
            'baidu': {
                six: 'u2689519',
                threeup: 'u2689518',
                threedown: 'u2689517',
                tujia: 'u2689516'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'huafubao': {
            'baidu': {
                six: 'u2689539',
                threeup: 'u2689538',
                threedown: 'u2689537',
                tujia: 'u2689531'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'yysun': {
            'baidu': {
                six: 'u2689942',
                threeup: 'u2689941',
                threedown: 'u2689939',
                tujia: 'u2689938'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'shifeng': {
            'baidu': {
                six: 'u2691687',
                threeup: 'u2691686',
                threedown: 'u2691685',
                tujia: 'u2691683'
            },
            'sogou': {
                bottom: '542151'
            }
        }
    }
};

(function() {
    var i = 0,
        specialChannel = [],
        ggBaidu = null,
        ggSogou = null,
        ggGdt = null,
        keywords = [],
        ime = '',
        noAppGgQid = [],
        ttaccid = '',
        apptypeid = '',
        noAppGgFlag = true;
    // 缓存用户id（365天）
    GLOBAL.Et.uid = Cookies.get('user_id');
    if (!GLOBAL.Et.uid) {
        GLOBAL.Et.uid = (+new Date()) + Math.random().toString(10).substring(2, 6);
        Cookies.set('user_id', GLOBAL.Et.uid, {expires: 365, path: '/', domain: 'eastday.com'});
    }
    // 缓存渠道号（3天）（渠道不存在得情况下使用默认渠道'null'）
    GLOBAL.Et.qid = GLOBAL.Util.getQueryString('qid') || Cookies.get('qid') || 'null';
    if (GLOBAL.Et.qid) {
        Cookies.set('qid', GLOBAL.Et.qid, {expires: 3, path: '/', domain: 'eastday.com'});
    }

    // 通过搜索引擎进入的（渠道处理）
    try {
        specialChannel = [
            {referer: 'baidu.com', qid: 'baiducom'},
            {referer: 'so.com', qid: '360so'},
            {referer: 'sogou.com', qid: 'sogoucom'},
            {referer: 'sm.cn', qid: 'smcn'}
        ];
        for (i = 0; i < specialChannel.length; i++) {
            if(GLOBAL.Util.getReferrer() && GLOBAL.Util.getReferrer().indexOf(specialChannel[i].referer) !== -1){
                GLOBAL.Et.qid = specialChannel[i].qid;
                break;
            }
        }
    } catch (e) {
        console.error('Fix SEO has error: \n', e);
    }

    // 通过APP分享出去的（渠道处理）
    try {
        ttaccid = GLOBAL.Util.getQueryString('ttaccid') || null;
        apptypeid = GLOBAL.Util.getQueryString('apptypeid') || null;
        if(ttaccid && GLOBAL.Browser.wechat){
            GLOBAL.Et.qid = 'ioswechat';
        } else if(ttaccid && (GLOBAL.Browser.qq || GLOBAL.Browser.qqbrowser)){
            GLOBAL.Et.qid = 'qqwechat';
        }
        // 以下很特殊（即使url中有ime的值，也要显示对应渠道广告）
        if(apptypeid === 'gsbrowser'){
            GLOBAL.Et.qid = 'gsbrowser';
            noAppGgFlag = false;
        } else if(apptypeid === 'ltbrowser') {
            GLOBAL.Et.qid = 'liantongbrowser';
            noAppGgFlag = false;
        }
    } catch (e) {
        console.error('Fix APP share has error: \n', e);
    }

    // 特殊渠道处理
    /*try {
        if(GLOBAL.Et.qid && typeof GLOBAL.Et.qid === 'string'){
            // 以m021_gsbrowser开头
            if(GLOBAL.Et.qid !== 'm021_gsbrowser_install' && GLOBAL.Et.qid.indexOf('m021_gsbrowser') === 0){  
                GLOBAL.Et.qid = 'm021_gsbrowser';
                GLOBAL.Cookie.set('qid', 'm021_gsbrowser', {expires: 3, path: '/', domain: 'eastday.com'});
            } else if(GLOBAL.Et.qid.indexOf('gsbrowser') === 0){    // 以gsbrowser开头
                GLOBAL.Et.qid = 'gsbrowser';
                GLOBAL.Cookie.set('qid', 'gsbrowser', {expires: 3, path: '/', domain: 'eastday.com'});
            } else if(GLOBAL.Et.qid.indexOf('m021_liantongbrowser') === 0){ // 以m021_liantongbrowser开头
                GLOBAL.Et.qid = 'm021_liantongbrowser';
                GLOBAL.Cookie.set('qid', 'm021_liantongbrowser', {expires: 3, path: '/', domain: 'eastday.com'});
            }
        }
    } catch (e) {
        console.error('Fix special qid has error: \n', e);
    }*/

    // 处理后再次存储qid
    Cookies.set('qid', GLOBAL.Et.qid, { expires: 3, path: '/', domain: 'eastday.com' });

    // 当前渠道广告商数组
    GLOBAL.Et.ggTypeArr = [];
    // 当前渠道广告ID数组（渠道无效的情况下使用默认渠道'null'的广告）
    GLOBAL.Et.gg = GLOBAL.Et.ggData.root[GLOBAL.Et.qid] || GLOBAL.Et.ggData.root['null'];
    for (i = 0; i < GLOBAL.Et.channelArr.length; i++) {
        if (GLOBAL.Et.gg && GLOBAL.Et.gg.hasOwnProperty(GLOBAL.Et.channelArr[i])) {
            GLOBAL.Et.ggTypeArr.push(GLOBAL.Et.channelArr[i]);
        }
    }

    /*
     * 对广告ID处理（为了方便获取、判断）
     */
    ggBaidu = GLOBAL.Et.gg.baidu;
    ggSogou = GLOBAL.Et.gg.sogou;
    ggGdt = GLOBAL.Et.gg.gdt;
    GLOBAL.namespace('GLOBAL.Et.gg.my');
    // six - baidu/sogou/gdt
    GLOBAL.Et.gg.my.six = (ggGdt ? (ggGdt.six ? 'gdt_' + ggGdt.six : '') : '') ||
        (ggBaidu ? (ggBaidu.six ? 'baidu_' + ggBaidu.six : '') : '') ||
        (ggSogou ? (ggSogou.six ? 'sogou_' + ggSogou.six : '') : '') ||
        GLOBAL.Et.ggData.root['null'].baidu.six;
    // threeup - baidu/sogou
    GLOBAL.Et.gg.my.threeup = (ggBaidu ? (ggBaidu.threeup ? 'baidu_' + ggBaidu.threeup : '') : '') ||
        (ggSogou ? (ggSogou.threeup ? 'sogou_' + ggSogou.threeup : '') : '');
    // threedown - baidu/sogou
    GLOBAL.Et.gg.my.threedown = (ggBaidu ? (ggBaidu.threedown ? 'baidu_' + ggBaidu.threedown : '') : '') ||
        (ggSogou ? (ggSogou.threedown ? 'sogou_' + ggSogou.threedown : '') : '');
    // bottom - sogou/gdt
    GLOBAL.Et.gg.my.bottom = (ggSogou ? (ggSogou.bottom ? 'sogou_' + ggSogou.bottom : '') : '') ||
        (ggGdt ? (ggGdt.bottom ? 'gdt_' + ggGdt.bottom : '') : '') ||
        GLOBAL.Et.ggData.root['null'].sogou.bottom;
    // tujia - baidu
    GLOBAL.Et.gg.my.tujia = (ggBaidu ? (ggBaidu.tujia ? 'baidu_' + ggBaidu.tujia : '') : '');
    // txt1 - baidu
    GLOBAL.Et.gg.my.txt1 = (ggBaidu ? (ggBaidu.txt1 ? 'baidu_' + ggBaidu.txt1 : '') : '');
    // txt2 - baidu
    GLOBAL.Et.gg.my.txt2 = (ggBaidu ? (ggBaidu.txt2 ? 'baidu_' + ggBaidu.txt2 : '') : '');
    // txt3 - baidu
    GLOBAL.Et.gg.my.txt3 = (ggBaidu ? (ggBaidu.txt3 ? 'baidu_' + ggBaidu.txt3 : '') : '');
    // cptop - baidu
    GLOBAL.Et.gg.my.cptop = (ggBaidu ? (ggBaidu.cptop ? 'baidu_' + ggBaidu.cptop : '') : '');
    // three (wnwifi) - baidu/sogou
    GLOBAL.Et.gg.my.three = (ggBaidu ? (ggBaidu.three ? 'baidu_' + ggBaidu.three : '') : '') ||
        (ggSogou ? (ggSogou.three ? 'sogou_' + ggSogou.three : '') : '');

    // 特殊广告处理（如果是QQ或QQ浏览器访问页面，six、bottom位置就展示广点通'gdt'广告）
    try {
        // GLOBAL.Et.gg.my.six = 'gdt_7030211295816964';
        // GLOBAL.Et.gg.my.bottom = 'gdt_5050515205011906';
        /*
          广点通测试ID
            7030211295816964
            5050515205011906
            4010810235519907
            1020613265313948
         */
        if(GLOBAL.Browser && typeof GLOBAL.Browser.wechat === 'boolean' && !GLOBAL.Browser.wechat){
            // qq一定要在qqbrowser之前判断
            if(GLOBAL.Browser.qq) {
                GLOBAL.Et.gg.my.six = 'gdt_1050119184991199';
                GLOBAL.Et.gg.my.bottom = 'gdt_1060014174891168';
            } else if(GLOBAL.Browser.qqbrowser) {
                GLOBAL.Et.gg.my.six = 'gdt_8010115151216515';
                GLOBAL.Et.gg.my.bottom = 'gdt_1040015141913673';
            }
        }
    } catch (e) {
        console.error('Fix gg(qq-gdt) has error: \n', e);
    }

    // 存储新闻类别
    try {
        GLOBAL.Et.newsType = document.getElementById('newstype') ? document.getElementById('newstype').value : 'toutiao';
        GLOBAL.Et.newsType = (GLOBAL.Et.newsType === 'weikandian') ? 'toutiao' : GLOBAL.Et.newsType;
    } catch (e) {
        console.error('newstype has error: \n', e);
    }

    // 关键词过滤（带领导人的新闻，不添加图加广告）
    keywords = [
        '习近平', '李克强', '张德江', '俞正声', '刘云山', '王岐山', '张高丽', '马凯', '王沪宁', '刘延东',
        '刘奇葆', '许其亮', '孙春兰', '孙政才', '李建国', '李源潮', '汪洋', '张春贤', '范长龙', '孟建柱',
        '赵乐际', '胡春华', '俞正声', '栗战书', '郭金龙', '韩正', '杜青林', '赵洪祝', '杨晶', '常万全',
        '房峰辉', '张阳', '赵克石', '张又侠', '吴胜利', '马晓天', '魏凤和', '黄树贤', '李玉赋', '杜金才',
        '吴玉良', '张军', '陈文清', '王伟', '毛泽东', '朱德', '刘少奇', '周恩来', '陈云', '林彪', '彭德怀',
        '邓小平', '邓子恢', '贺龙', '陈毅', '乌兰夫', '李富春', '李先念', '聂荣臻', '薄一波', '宋庆龄',
        '董必武', '习仲勋', '薄一波', '谭震林', '陆定一', '罗瑞卿', '江泽民', '荣毅仁', '乔石', '李鹏',
        '朱镕基', '邹家华', '钱其琛', '李岚清', '吴邦国', '姜春云', '李瑞怀', '刘华清', '张震', '胡锦涛',
        '曾庆红', '吴邦国', '温家宝', '黄菊', '吴仪', '曾培炎', '回良玉', '贾庆林'
    ];

    for (i = 0; i < keywords.length; i++) {
        if (document.title.indexOf(keywords[i]) !== -1) {
            GLOBAL.Et.gg.my.tujia = null;
            break;
        }
    }

    // 去掉百度文字链广告
    GLOBAL.Et.gg.my.txt1 = null;
    GLOBAL.Et.gg.my.txt2 = null;
    GLOBAL.Et.gg.my.txt3 = null;


    // 无任何广告的渠道处理
    ime = GLOBAL.Util.getQueryString('ime');
    noAppGgQid = ['wpsios', 'wpsandroid', 'm021_wy003', 'shangyewifiliu2'];
    if(noAppGgFlag && (ime || noAppGgQid.contains(GLOBAL.Et.qid))){
        GLOBAL.Et.gg.my.nogg = true;
        GLOBAL.Et.gg.my.six = null;
        GLOBAL.Et.gg.my.threeup = null;
        GLOBAL.Et.gg.my.threedown = null;
        GLOBAL.Et.gg.my.bottom = null;
        GLOBAL.Et.gg.my.tujia = null;
        GLOBAL.Et.gg.my.cptop = null;
        GLOBAL.Et.gg.my.txt1 = null;
        GLOBAL.Et.gg.my.txt2 = null;
        GLOBAL.Et.gg.my.txt3 = null;
        GLOBAL.Et.gg.my.three = null;
    }

}());
