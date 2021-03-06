/**
 * 详情页广告JS
 * @deps global.js
 * @author  lizhigao(lizhigao@021.com)
 * @date 2016-06-03
 */
// 创建一个Et命名空间
GLOBAL.namespace('Et');
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
                chaping: 'u2594076'
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
                chaping: 'u2594091'
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
                chaping: 'u2602396'
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
        'woliuliang': {
            'baidu': {
                six: 'u2600915',
                threeup: 'u2600919',
                threedown: 'u2600921',
                tujia: 'u2600925',
                chaping: 'u2600938'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'wifixinhaocha': {
            'baidu': {
                six: 'u2607235',
                threeup: 'u2607238',
                threedown: 'u2607236',
                tujia: 'u2607248'
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
        'wifigongchang': {
            'baidu': {
                six: 'u2597510',
                threeup: 'u2597512',
                threedown: 'u2597514',
                tujia: 'u2597515',
                chaping: 'u2597517'
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
        'wh002': {
            'baidu': {
                six: 'u2470431',
                threeup: 'u2470432',
                threedown: 'u2470436'
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
        'tieluwifi': {
            'baidu': {
                six: 'u2570414',
                threeup: 'u2570412',
                threedown: 'u2570411',
                tujia: 'u2570459'
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
                tujia: 'u2480224',
                chaping: 'u2570147'
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
                chaping: 'u2649539'
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
        'shoujishuxiang': {
            'baidu': {
                six: 'u2366999',
                threeup: 'u2375657',
                threedown: 'u2375659'
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
                chaping: 'u2560793',
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
                chaping: 'u2608749'
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
        'ranwen01': {
            'baidu': {
                six: 'u2602376',
                threeup: 'u2602378',
                threedown: 'u2602380',
                tujia: 'u2602382',
                chaping: 'u2602383'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'ranwen': {
            'baidu': {
                six: 'u2581098',
                threeup: 'u2581099',
                threedown: 'u2581101',
                tujia: 'u2581102'
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
        'phonepingtai': {
            'baidu': {
                six: 'u2582185',
                threeup: 'u2582186',
                threedown: 'u2582188',
                tujia: 'u2582189'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'phone002': {
            'baidu': {
                six: 'u2603239',
                threeup: 'u2603245',
                threedown: 'u2603251',
                tujia: 'u2603254',
                chaping: 'u2603255'
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
                chaping: 'u2602509'
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
        'nubiyabrowser': {
            'baidu': {
                six: 'u2600932',
                threeup: 'u2600928',
                threedown: 'u2600931',
                tujia: 'u2600935',
                chaping: 'u2600937'
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
                chaping: 'u2570140',
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
        'milizhuomian': {
            'baidu': {
                six: 'u2597484',
                threeup: 'u2597485',
                threedown: 'u2597489',
                tujia: 'u2597490',
                chaping: 'u2597493'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'mengmengnaozhong': {
            'baidu': {
                six: 'u2546644',
                threeup: 'u2546647',
                threedown: 'u2546648',
                tujia: 'u2546651'
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
        'maiwaidi': {
            'baidu': {
                six: 'u2582195',
                threeup: 'u2582199',
                threedown: 'u2582203',
                tujia: 'u2582206'
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
                chaping: 'u2602664'
            },
            'sogou': {
                threeup: '565296',
                threedown: '565296',
                bottom: '565296'
            }
        },
        'm021_waitui028': {
            'baidu': {
                six: 'u2602636',
                threeup: 'u2602632',
                threedown: 'u2602557',
                tujia: 'u2602629',
                chaping: 'u2602660'
            },
            'sogou': {
                threeup: '565296',
                threedown: '565296',
                bottom: '565296'
            }
        },
        'm021_waitui027': {
            'baidu': {
                six: 'u2602624',
                threeup: 'u2602622',
                threedown: 'u2602621',
                tujia: 'u2602617',
                chaping: 'u2602658'
            },
            'sogou': {
                threeup: '565296',
                threedown: '565296',
                bottom: '565296'
            }
        },
        'm021_waitui026': {
            'baidu': {
                six: 'u2602591',
                threeup: 'u2602593',
                threedown: 'u2602595',
                tujia: 'u2602597',
                chaping: 'u2602606'
            },
            'sogou': {
                threeup: '565296',
                threedown: '565296',
                bottom: '565296'
            }
        },
        'm021_waitui023': {
            'baidu': {
                six: 'u2602569',
                threeup: 'u2602572',
                threedown: 'u2602575',
                tujia: 'u2602576',
                chaping: 'u2602600'
            },
            'sogou': {
                threeup: '565296',
                threedown: '565296',
                bottom: '565296'
            }
        },
        'm021_waitui021': {
            'baidu': {
                six: 'u2602602',
                threeup: 'u2602596',
                threedown: 'u2602592',
                tujia: 'u2602588',
                chaping: 'u2602668'
            },
            'sogou': {
                threeup: '565296',
                threedown: '565296',
                bottom: '565296'
            }
        },
        'm021_waitui017': {
            'baidu': {
                six: 'u2540956',
                threeup: 'u2541248',
                threedown: 'u2541307',
                tujia: 'u2541171',
                chaping: 'u2603852'
            },
            'sogou': {
                threeup: '565296',
                threedown: '565296',
                bottom: '565296'
            }
        },
        'm021_waitui015': {
            'baidu': {
                six: 'u2540952',
                threeup: 'u2541244',
                threedown: 'u2541301',
                tujia: 'u2541178',
                chaping: 'u2603847'
            },
            'sogou': {
                threeup: '565296',
                threedown: '565296',
                bottom: '565296'
            }
        },
        'm021_waitui011': {
            'baidu': {
                six: 'u2540942',
                threeup: 'u2541233',
                threedown: 'u2541285',
                tujia: 'u2541124',
                chaping: 'u2603835'
            },
            'sogou': {
                threeup: '565296',
                threedown: '565296',
                bottom: '565296'
            }
        },
        'm021_waitui010': {
            'baidu': {
                six: 'u2540941',
                threeup: 'u2541232',
                threedown: 'u2541283',
                tujia: 'u2541121',
                chaping: 'u2603832'
            },
            'sogou': {
                threeup: '565296',
                threedown: '565296',
                bottom: '565296'
            }
        },
        'm021_waitui009': {
            'baidu': {
                six: 'u2540939',
                threeup: 'u2541228',
                threedown: 'u2541280',
                tujia: 'u2541076',
                chaping: 'u2603831'
            },
            'sogou': {
                threeup: '565296',
                threedown: '565296',
                bottom: '565296'
            }
        },
        'm021_waitui008': {
            'baidu': {
                six: 'u2540936',
                threeup: 'u2541226',
                threedown: 'u2541276',
                tujia: 'u2541074',
                chaping: 'u2603827'
            },
            'sogou': {
                threeup: '565296',
                threedown: '565296',
                bottom: '565296'
            }
        },
        'm021_waitui007': {
            'baidu': {
                six: 'u2540933',
                threeup: 'u2541223',
                threedown: 'u2541275',
                tujia: 'u2541072',
                chaping: 'u2603824'
            },
            'sogou': {
                threeup: '565296',
                threedown: '565296',
                bottom: '565296'
            }
        },
        'm021_waitui006': {
            'baidu': {
                six: 'u2540932',
                threeup: 'u2541222',
                threedown: 'u2541272',
                tujia: 'u2541070',
                chaping: 'u2603823'
            },
            'sogou': {
                threeup: '565296',
                threedown: '565296',
                bottom: '565296'
            }
        },
        'm021_waitui005': {
            'baidu': {
                six: 'u2540930',
                threeup: 'u2541218',
                threedown: 'u2541270',
                tujia: 'u2541069',
                chaping: 'u2603820'
            },
            'sogou': {
                threeup: '565296',
                threedown: '565296',
                bottom: '565296'
            }
        },
        'm021_waitui004': {
            'baidu': {
                six: 'u2540929',
                threeup: 'u2541213',
                threedown: 'u2541267',
                tujia: 'u2541067',
                chaping: 'u2603817'
            },
            'sogou': {
                threeup: '565296',
                threedown: '565296',
                bottom: '565296'
            }
        },
        'm021_waitui003': {
            'baidu': {
                six: 'u2540928',
                threeup: 'u2541207',
                threedown: 'u2541265',
                tujia: 'u2541066',
                chaping: 'u2603812'
            },
            'sogou': {
                threeup: '565296',
                threedown: '565296',
                bottom: '565296'
            }
        },
        'm021_waitui002': {
            'baidu': {
                six: 'u2540927',
                threeup: 'u2541205',
                threedown: 'u2541215',
                tujia: 'u2541064',
                chaping: 'u2603808'
            },
            'sogou': {
                threeup: '565296',
                threedown: '565296',
                bottom: '565296'
            }
        },
        'm021_waitui001': {
            'baidu': {
                six: 'u2540926',
                threeup: 'u2541130',
                threedown: 'u2541212',
                tujia: 'u2541062',
                chaping: 'u2603807'
            },
            'sogou': {
                threeup: '565296',
                threedown: '565296',
                bottom: '565296'
            }
        },
        'm021_pgzs': {
            'baidu': {
                six: 'u2536113',
                threeup: 'u2536073',
                threedown: 'u2536081',
                tujia: 'u2536538'
            },
            'sogou': {
                six: '565296',
                threeup: '565296',
                threedown: '565296',
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
                chaping: 'u2588867',
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
        'liantong114': {
            'baidu': {
                six: 'u2564489',
                threeup: 'u2564491',
                threedown: 'u2564492',
                tujia: 'u2564493'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'lianlewuxianin': {
            'baidu': {
                six: 'u2572230',
                threeup: 'u2572229',
                threedown: 'u2572225',
                tujia: 'u2572223'
            },
            'sogou': {
                bottom: '542151'
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
        'lemonllq': {
            'baidu': {
                six: 'u2590814',
                threeup: 'u2590817',
                threedown: 'u2590818',
                tujia: 'u2590822'
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
                tujia: 'u2477629',
                chaping: 'u2497102'
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
                chaping: 'u2592497'
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
        'laidianbao': {
            'baidu': {
                six: 'u2601773',
                threeup: 'u2601777',
                threedown: 'u2601781',
                tujia: 'u2601784',
                chaping: 'u2601787'
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
                chaping: 'u2588877',
                txt1: 'u2592612',
                txt2: 'u2592614',
                txt3: 'u2592615'
            },
            'sogou': {
                bottom: '542151'
            },
            'gdt': {
                six: '5090915115252200'
            }
        },
        'kkbrowser': {
            'baidu': {
                six: 'u2472733',
                threeup: 'u2472734',
                threedown: 'u2472737'
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
                chaping: 'u2613816'
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
        'jiankang53': {
            'baidu': {
                six: 'u2576001',
                threeup: 'u2575999',
                threedown: 'u2575998',
                tujia: 'u2576011'
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
            },
            'gdt': {
                six: '8060214175858267'
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
        'hiwifi': {
            'baidu': {
                six: 'u2521550',
                threeup: 'u2521552',
                threedown: 'u2521557'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'hengman': {
            'baidu': {
                six: 'u2576048',
                threeup: 'u2576047',
                threedown: 'u2576045',
                tujia: 'u2576044'
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
                chaping: 'u2596951'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'guxiongbrowser': {
            'baidu': {
                six: 'u2561597',
                threeup: 'u2561600',
                threedown: 'u2561601',
                tujia: 'u2561604'
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
                threedown: 'u2585540',
                txt1: 'u2603268',
                txt2: 'u2603269',
                txt3: 'u2603272'
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
                tujia: 'u2480212',
                chaping: 'u2497099'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'gaosumz': {
            'baidu': {
                six: 'u2580277',
                threeup: 'u2580279',
                threedown: 'u2580281'
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
                chaping: 'u2594063'
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
                chaping: 'u2588874',
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
                chaping: 'u2570150'
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
                chaping: 'u2597505'
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
        'cha': {
            'baidu': {
                six: 'u2576018',
                threeup: 'u2576017',
                threedown: 'u2575944',
                tujia: 'u2575940'
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
                bottom: '542151'
            }
        },
        'apdft_lc004': {
            'baidu': {
                six: 'u2563683',
                threeup: 'u2563679',
                threedown: 'u2563681'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'apdft_lc003': {
            'baidu': {
                six: 'u2563669',
                threeup: 'u2563665',
                threedown: 'u2563666'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'apdft_lc002': {
            'baidu': {
                six: 'u2563656',
                threeup: 'u2563649',
                threedown: 'u2563652'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'apdft_lc001': {
            'baidu': {
                six: 'u2563595',
                threeup: 'u2563597',
                threedown: 'u2563645'
            },
            'sogou': {
                bottom: '542151'
            }
        },
        'aoyouie': {
            'baidu': {
                six: 'u2615535',
                threeup: 'u2615536',
                threedown: 'u2615537',
                tujia: 'u2615538',
                chaping: 'u2615539'
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
                threedown: 'u2383942',
                tujia: 'u2546531'
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
        '521hao8': {
            'baidu': {
                six: 'u2575988',
                threeup: 'u2575985',
                threedown: 'u2575971',
                tujia: 'u2576012'
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
                chaping: 'u2614040'
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
                chaping: 'u2588870',
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
            }
        },
        'shangyewifiliu2': {
            'baidu': {
                six: 'u2612145',
                threeup: 'u2612150',
                threedown: 'u2612154',
                tujia: 'u2612158',
                chaping: 'u2612160'
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
        'antutu': {
            'baidu': {
                six: 'u2610321',
                threeup: 'u2610340',
                threedown: 'u2610367',
                tujia: 'u2610369',
                chaping: 'u2610337'
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
                chaping: 'u2612545'
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
                chaping: 'u2610334'
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
                chaping: 'u2610335'
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
                chaping: 'u2618194'
            }
        },
        '16gongjiaowifi': {
            'baidu': {
                six: 'u2620737',
                threeup: 'u2620741',
                threedown: 'u2620742',
                tujia: 'u2620746'
            }
        },
        'yijianqinglidashi02': {
            'baidu': {
                six: 'u2622806',
                threeup: 'u2622809',
                threedown: 'u2622816',
                tujia: 'u2622817',
                chaping: 'u2622884'
            }
        },
        'yijianqinglidashi03': {
            'baidu': {
                six: 'u2622822',
                threeup: 'u2622825',
                threedown: 'u2622827',
                tujia: 'u2622829',
                chaping: 'u2622888'
            }
        },
        'operashangdian': {
            'baidu': {
                six: 'u2627161',
                threeup: 'u2627164',
                threedown: 'u2627163',
                tujia: 'u2627165',
                chaping: 'u2627159'
            }
        },
        'zhuanqianbao': {
            'baidu': {
                six: 'u2628225',
                threeup: 'u2628235',
                threedown: 'u2628229',
                tujia: 'u2628239',
                chaping: 'u2628214'
            }
        },
        '360wifi': {
            'baidu': {
                six: 'u2627955',
                threeup: 'u2627949',
                threedown: 'u2627951',
                tujia: 'u2627947',
                chaping: 'u2627958'
            }
        },
        'nduowang': {
            'baidu': {
                six: 'u2628494',
                threeup: 'u2628498',
                threedown: 'u2628497',
                tujia: 'u2628499',
                chaping: 'u2628492'
            }
        },
        'hongbaokuaishou': {
            'baidu': {
                six: 'u2628443',
                threeup: 'u2628446',
                threedown: 'u2628445',
                tujia: 'u2628448',
                chaping: 'u2628450'
            }
        },
        'hihizhuanfa': {
            'baidu': {
                six: 'u2628423',
                threeup: 'u2628436',
                threedown: 'u2628425',
                tujia: 'u2628439',
                chaping: 'u2628421'
            }
        },
        'romcloud': {
            'baidu': {
                six: 'u2629638',
                threeup: 'u2629633',
                threedown: 'u2629639',
                tujia: 'u2629628',
                chaping: 'u2629642'
            }
        },
        'chatiyu1': {
            'baidu': {
                six: 'u2629818',
                threeup: 'u2629821',
                threedown: 'u2629817',
                tujia: 'u2629911',
                chaping: 'u2629824'
            }
        },
        'jiuyi160': {
            'baidu': {
                six: 'u2634492',
                threeup: 'u2634488',
                threedown: 'u2634491',
                tujia: 'u2634484',
                chaping: 'u2634497'
            }
        },
        'qiaohuiwangluo': {
            'baidu': {
                six: 'u2634677',
                threeup: 'u2634682',
                threedown: 'u2634678',
                tujia: 'u2634683',
                chaping: 'u2634685'
            }
        },
        'mzol': {
            'baidu': {
                six: 'u2635727',
                threeup: 'u2635721',
                threedown: 'u2635724',
                tujia: 'u2635712',
                chaping: 'u2635726'
            }
        },
        'yijianqinglidashi': {
            'baidu': {
                six: 'u2635947',
                threeup: 'u2635953',
                threedown: 'u2635950',
                tujia: 'u2635955',
                chaping: 'u2635957'
            }
        },
        'chubaophone': {
            'baidu': {
                six: 'u2636095',
                threeup: 'u2636090',
                threedown: 'u2636094',
                tujia: 'u2636089',
                chaping: 'u2636096'
            }
        },
        'm021_hyx001': {
            'baidu': {
                six: 'u2636104',
                threeup: 'u2636108',
                threedown: 'u2636106',
                tujia: 'u2636110',
                chaping: 'u2636112'
            }
        },
        'm021_hyx002': {
            'baidu': {
                six: 'u2636114',
                threeup: 'u2636119',
                threedown: 'u2636115',
                tujia: 'u2636120',
                chaping: 'u2636121'
            }
        },
        'm021_hyx003': {
            'baidu': {
                six: 'u2636626',
                threeup: 'u2636688',
                threedown: 'u2636647',
                tujia: 'u2636630',
                chaping: 'u2637153'
            }
        },
        'm021_hyx004': {
            'baidu': {
                six: 'u2636700',
                threeup: 'u2636714',
                threedown: 'u2636705',
                tujia: 'u2636721',
                chaping: 'u2636724'
            }
        },
        'm021_hyx005': {
            'baidu': {
                six: 'u2636726',
                threeup: 'u2636731',
                threedown: 'u2636728',
                tujia: 'u2636732',
                chaping: 'u2636733'
            }
        },
        'm021_hyx006': {
            'baidu': {
                six: 'u2636737',
                threeup: 'u2636759',
                threedown: 'u2636746',
                tujia: 'u2636762',
                chaping: 'u2636767'
            }
        },
        'm021_hyx007': {
            'baidu': {
                six: 'u2636774',
                threeup: 'u2636784',
                threedown: 'u2636776',
                tujia: 'u2636786',
                chaping: 'u2636787'
            }
        },
        '511dianying': {
            'baidu': {
                six: 'u2636913',
                threeup: 'u2636925',
                threedown: 'u2636919',
                tujia: 'u2636926',
                chaping: 'u2636927'
            }
        },
        'chinatelnj': {
            'baidu': {
                six: 'u2636818',
                threeup: 'u2636824',
                threedown: 'u2636820',
                tujia: 'u2636837',
                chaping: 'u2636827'
            }
        },
        'xiaozikeji': {
            'baidu': {
                six: 'u2637016',
                threeup: 'u2637024',
                threedown: 'u2637019',
                tujia: 'u2637028',
                chaping: 'u2637029'
            }
        },
        'youxinh5': {
            'baidu': {
                six: 'u2637035',
                threeup: 'u2637046',
                threedown: 'u2637040',
                tujia: 'u2637048',
                chaping: 'u2637051'
            }
        },
        'laokgame ': {
            'baidu': {
                six: 'u2637442',
                threeup: 'u2637446',
                threedown: 'u2637444',
                tujia: 'u2637447',
                chaping: 'u2637450'
            }
        },
        'wpsios': {
            'baidu': {
                six: 'u2637968',
                threeup: 'u2637993',
                threedown: 'u2637974',
                tujia: 'u2638010',
                chaping: 'u2638003'
            }
        },
        'ucllqsun': {
            'baidu': {
                six: 'u2638677',
                threeup: 'u2638682',
                threedown: 'u2638678',
                tujia: 'u2638685'
            }
        },
        'zhuanyidou': {
            'baidu': {
                six: 'u2640990',
                threeup: 'u2640986',
                threedown: 'u2640988',
                tujia: 'u2640981',
                chaping: 'u2640985'
            }
        },
        'taosuoping': {
            'baidu': {
                six: 'u2641077',
                threeup: 'u2641082',
                threedown: 'u2641078',
                tujia: 'u2641081'
            }
        },
        'jinlisun': {
            'baidu': {
                six: 'u2641151',
                threeup: 'u2641139',
                threedown: 'u2641149',
                tujia: 'u2641141',
            }
        },
        'zhanglida': {
            'baidu': {
                six: 'u2642797',
                threeup: 'u2642793',
                threedown: 'u2642795',
                tujia: 'u2642802',
                chaping: 'u2642805'
            }
        },
        'ucllqsun01': {
            'baidu': {
                six: 'u2648133',
                threeup: 'u2648214',
                threedown: 'u2648154',
                tujia: 'u2648219'
            }
        },
        'ljbrowser': {
            'baidu': {
                six: 'u2648221',
                threeup: 'u2648232',
                threedown: 'u2648222'
            }
        },
        'tiantianrj': {
            'baidu': {
                six: 'u2648329',
                threeup: 'u2648338',
                threedown: 'u2648330',
                tujia: 'u2648340'
            }
        },
        'aishangwifi': {
            'baidu': {
                six: 'u2648363',
                threeup: 'u2648381',
                threedown: 'u2648369',
                tujia: 'u2648384'
            }
        },
        'shujuan': {
            'baidu': {
                six: 'u2648393',
                threeup: 'u2648405',
                threedown: 'u2648396',
                tujia: 'u2648422'
            }
        },
        'hjjingling': {
            'baidu': {
                six: 'u2646230',
                threeup: 'u2646227',
                threedown: 'u2646229',
                tujia: 'u2646234',
                chaping: 'u2646236'
            }
        },
        'kuaijiewifi': {
            'baidu': {
                six: 'u2648514',
                threeup: 'u2648543',
                threedown: 'u2648529',
                tujia: 'u2648555',
                chaping: 'u2648557'
            }
        },
        'yuedu1': {
            'baidu': {
                six: 'u2648568',
                threeup: 'u2648603',
                threedown: 'u2648594',
                tujia: 'u2648609'
            }
        },
        'yuedu2': {
            'baidu': {
                six: 'u2648620',
                threeup: 'u2648666',
                threedown: 'u2648654',
                tujia: 'u2648700'
            }
        },
        'yuedu3': {
            'baidu': {
                six: 'u2648721',
                threeup: 'u2648748',
                threedown: 'u2648723',
                tujia: 'u2648757'
            }
        },
        'yuedu4': {
            'baidu': {
                six: 'u2648774',
                threeup: 'u2648795',
                threedown: 'u2648776',
                tujia: 'u2648801'
            }
        },
        'yuedu5': {
            'baidu': {
                six: 'u2648803',
                threeup: 'u2648816',
                threedown: 'u2648808',
                tujia: 'u2648819'
            }
        },
        'yjqlds01': {
            'baidu': {
                six: 'u2649287',
                threeup: 'u2649280',
                threedown: 'u2649285',
                tujia: 'u2649271',
                chaping: 'u2649272'
            }
        },
        'ucllqsun02': {
            'baidu': {
                six: 'u2649522',
                threeup: 'u2649533',
                threedown: 'u2649523',
                tujia: 'u2649535'
            }
        },
        'ucllqsun03': {
            'baidu': {
                six: 'u2649536',
                threeup: 'u2649544',
                threedown: 'u2649540',
                tujia: 'u2649546'
            }
        },
        'shujuan01': {
            'baidu': {
                six: 'u2649854',
                threeup: 'u2649901',
                threedown: 'u2649897',
                tujia: 'u2649907',
                chaping: 'u2649908'
            }
        },
        'm021_myworld': {
            'baidu': {
                six: 'u2652098',
                threeup: 'u2652109',
                threedown: 'u2652103',
                tujia: 'u2652112'
            }
        },
        'uckuzhan': {
            'baidu': {
                six: 'u2652121',
                threeup: 'u2652125',
                threedown: 'u2652122',
                tujia: 'u2652126'
            }
        },
        'haixunyidong': {
            'baidu': {
                six: 'u2649854',
                threeup: 'u2649901',
                threedown: 'u2649897',
                tujia: 'u2649907',
                chaping: 'u2649908'
            }
        },
        'jinyu01': {
            'baidu': {
                six: 'u2656516',
                threeup: 'u2656520',
                threedown: 'u2656518',
                tujia: 'u2656521',
                chaping: 'u2656522'
            }
        },
        'jinyu02': {
            'baidu': {
                six: 'u2656524',
                threeup: 'u2656527',
                threedown: 'u2656525',
                tujia: 'u2656528',
                chaping: 'u2656529'
            }
        },
        'jinyu03': {
            'baidu': {
                six: 'u2656530',
                threeup: 'u2656535',
                threedown: 'u2656533',
                tujia: 'u2656536',
                chaping: 'u2656537'
            }
        },
        'wdcx': {
            'baidu': {
                six: 'u2656508',
                threeup: 'u2656513',
                threedown: 'u2656509',
                tujia: 'u2656514',
                chaping: 'u2656515'
            }
        },
        'yilangkeji01': {
            'baidu': {
                six: 'u2657390',
                threeup: 'u2657395',
                threedown: 'u2657392',
                tujia: 'u2657397',
                chaping: 'u2657398'
            }
        },
        'yilangkeji02': {
            'baidu': {
                six: 'u2657399',
                threeup: 'u2657404',
                threedown: 'u2657401',
                tujia: 'u2657405',
                chaping: 'u2657406'
            }
        },
        'zhongmaikeji': {
            'baidu': {
                six: 'u2657408',
                threeup: 'u2657411',
                threedown: 'u2657409',
                tujia: 'u2657413',
                chaping: 'u2657414'
            }
        },
        'wdcx01': {
            'baidu': {
                six: 'u2658901',
                threeup: 'u2658904',
                threedown: 'u2658902',
                tujia: 'u2658907',
                chaping: 'u2658912'
            }
        },
        'm021_gsbrowser_install': {
            'baidu': {
                six: 'u2659934',
                threeup: 'u2659938',
                threedown: 'u2659935',
                tujia: 'u2659942',
                chaping: 'u2659944'
            }
        },
        'gsbrowser': {
            'baidu': {
                six: 'u2429963',
                threeup: 'u2429964',
                threedown: 'u2429965',
                tujia: 'u2659924',
                chaping: 'u2659929'
            }
        },
        'lianxianglvcha': {
            'baidu': {
                six: 'u2659955',
                threeup: 'u2659958',
                threedown: 'u2659956',
                tujia: 'u2659959',
                chaping: 'u2659961'
            }
        },
        'juheshuju': {
            'baidu': {
                six: 'u2659964',
                threeup: 'u2659973',
                threedown: 'u2659967'
            }
        },
        'yousu': {
            'baidu': {
                six: 'u2661384',
                threeup: 'u2661383',
                threedown: 'u2661386',
                tujia: 'u2661149',
                chaping: 'u2661160'
            }
        },
        'm021_waitui035': {
            'baidu': {
                six: 'u2607285',
                tujia: 'u2607326',
                chaping: 'u2607344'
            },
            'sogou': {
                threeup: '565296',
                threedown: '565296',
                bottom: '565296'
            }
        },
        'm021_waitui034': {
            'baidu': {
                six: 'u2607363',
                tujia: 'u2607290',
                chaping: 'u2607342'
            },
            'sogou': {
                threeup: '565296',
                threedown: '565296',
                bottom: '565296'
            }
        },
        'm021_waitui033': {
            'baidu': {
                six: 'u2607299',
                tujia: 'u2607284',
                chaping: 'u2607341'
            },
            'sogou': {
                threeup: '565296',
                threedown: '565296',
                bottom: '565296'
            }
        },
        'm021_waitui032': {
            'baidu': {
                six: 'u2607287',
                tujia: 'u2607281',
                chaping: 'u2607336'
            },
            'sogou': {
                threeup: '565296',
                threedown: '565296',
                bottom: '565296'
            }
        },
        'm021_waitui031': {
            'baidu': {
                six: 'u2607321',
                tujia: 'u2607279',
                chaping: 'u2607334'
            },
            'sogou': {
                threeup: '565296',
                threedown: '565296',
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
            'baidu': {
                tujia: 'u2585019'
            },
            'sogou': {
                six: '562460',
                threeup: '562460',
                threedown: '562460',
                bottom: '562460'
            }
        },
        'm021_wy001': {
            'sogou': {
                six: '542150',
                threeup: '542150',
                threedown: '542150',
                bottom: '542150'
            }
        },
        'm021_wy002': {
            'sogou': {
                six: '542153',
                threeup: '542153',
                threedown: '542153',
                bottom: '542153'
            }
        },
        'm021_wy013': {
            'sogou': {
                six: '562453',
                threeup: '562453',
                threedown: '562453',
                bottom: '562453'
            }
        },
        'm021_wy047': {
            'sogou': {
                six: '571747',
                threeup: '571747',
                threedown: '571747',
                bottom: '571747'
            }
        },
        'm021_wy083': {
            'sogou': {
                six: '542152',
                threeup: '542152',
                threedown: '542152',
                bottom: '542152'
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
        }
    }
};


// 缓存用户id
GLOBAL.Et.uid = Cookies.get('user_id');
if(!GLOBAL.Et.uid) {
	GLOBAL.Et.uid = (+new Date()) + Math.random().toString(10).substring(2, 6);
	Cookies.set('user_id', GLOBAL.Et.uid, { expires: 365, path: '/', domain: 'eastday.com'});
}
// 缓存渠道ID
GLOBAL.Et.qid = GLOBAL.Util.getQueryString('qid') || Cookies.get('qid') || 'null';
if(GLOBAL.Et.qid){
	Cookies.set('qid', GLOBAL.Et.qid, { expires: 3, path: '/', domain: 'eastday.com'});
}

// 广告渠道数组
GLOBAL.Et.channelArr  = ['baidu', 'sogou', 'gdt'];

GLOBAL.Et.ggTypeArr = [];	// 广告商数组
GLOBAL.Et.gg = GLOBAL.Et.ggData.root[GLOBAL.Et.qid];		// 广告ID数组
for (var i = 0; i < GLOBAL.Et.channelArr.length; i++) {
	if(GLOBAL.Et.gg && GLOBAL.Et.gg.hasOwnProperty(GLOBAL.Et.channelArr[i])){
		GLOBAL.Et.ggTypeArr.push(GLOBAL.Et.channelArr[i]);
	}
}

// console.log('GLOBAL.Et.qid::', GLOBAL.Et.qid);
// console.log('GLOBAL.Et.ggTypeArr::', GLOBAL.Et.ggTypeArr);
// console.log('GLOBAL.Et.ggTypeArr::', GLOBAL.Et.ggTypeArr.contains('sogou'));
console.log('GLOBAL.Et.gg::', GLOBAL.Et.gg);

// six
GLOBAL.Et.gg.hasSix = (GLOBAL.Et.gg['baidu'] ? GLOBAL.Et.gg['baidu']['six'] : '') 
	|| (GLOBAL.Et.gg['sogou'] ? GLOBAL.Et.gg['sogou']['six'] : '') 
	|| (GLOBAL.Et.gg['gdt'] ? GLOBAL.Et.gg['gdt']['six'] : '');
// threeup
GLOBAL.Et.gg.hasThreeup = (GLOBAL.Et.gg['baidu'] ? GLOBAL.Et.gg['baidu']['threeup'] : '') 
	|| (GLOBAL.Et.gg['sogou'] ? GLOBAL.Et.gg['sogou']['threeup'] : '');
// threedown
GLOBAL.Et.gg.hasThreedown = (GLOBAL.Et.gg['baidu'] ? GLOBAL.Et.gg['baidu']['threedown'] : '') 
	|| (GLOBAL.Et.gg['sogou'] ? GLOBAL.Et.gg['sogou']['threedown'] : '');
// bottom
GLOBAL.Et.gg.hasBottom = (GLOBAL.Et.gg['sogou'] ? GLOBAL.Et.gg['sogou']['bottom'] : '') 
	|| (GLOBAL.Et.gg['gdt'] ? GLOBAL.Et.gg['gdt']['bottom'] : '');
// tujia
GLOBAL.Et.gg.hasTujia = (GLOBAL.Et.gg['baidu'] ? GLOBAL.Et.gg['baidu']['tujia'] : '');
// txt1
GLOBAL.Et.gg.hasTxt1 = (GLOBAL.Et.gg['baidu'] ? GLOBAL.Et.gg['baidu']['txt1'] : '');
// txt2
GLOBAL.Et.gg.hasTxt2 = (GLOBAL.Et.gg['baidu'] ? GLOBAL.Et.gg['baidu']['txt2'] : '');
// txt3
GLOBAL.Et.gg.hasTxt3 = (GLOBAL.Et.gg['baidu'] ? GLOBAL.Et.gg['baidu']['txt3'] : '');
// chaping
GLOBAL.Et.gg.hasChaping = (GLOBAL.Et.gg['baidu'] ? GLOBAL.Et.gg['baidu']['chaping'] : '');
// three (wnwifi)
GLOBAL.Et.gg.hasThree = (GLOBAL.Et.gg['baidu'] ? GLOBAL.Et.gg['baidu']['three'] : '') 
	|| (GLOBAL.Et.gg['sogou'] ? GLOBAL.Et.gg['sogou']['three'] : '');

console.log('hasSix::', GLOBAL.Et.gg.hasSix);
console.log('hasThreeup::', GLOBAL.Et.gg.hasThreeup);
console.log('hasThreedown::', GLOBAL.Et.gg.hasThreedown);
console.log('hasBottom::', GLOBAL.Et.gg.hasBottom);
console.log('hasTujia::', GLOBAL.Et.gg.hasTujia);
console.log('hasTxt1::', GLOBAL.Et.gg.hasTxt1);
console.log('hasTxt2::', GLOBAL.Et.gg.hasTxt2);
console.log('hasTxt3::', GLOBAL.Et.gg.hasTxt3);
console.log('hasChaping::', GLOBAL.Et.gg.hasChaping);
console.log('hasThree::', GLOBAL.Et.gg.hasThree);


