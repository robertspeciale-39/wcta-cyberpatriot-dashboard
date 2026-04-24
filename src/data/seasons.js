// WCTA CyberPatriot Historical Data
// Sourced from Copy_of_WCTA_Cyberpatriot_Scoreboard.xlsx

export const SEASONS = ['22-23', '23-24', '24-25', '25-26']

export const ROUNDS = ['Round 1', 'Round 2', 'State', 'Semi-Finals']

// Season 25-26 (current)
const s2526_r1 = [
  { teamId: '18-1535', teamName: 'Shake and Bake', linux: 100, windowsDesktop: 95, windowsServer: null, packetQuiz: 10, packetImage: 13.8, totalScore: 218.8, nationalRank: 124, nvRank: 2 },
  { teamId: '18-1539', teamName: 'AFR', linux: 100, windowsDesktop: 100, windowsServer: null, packetQuiz: 10, packetImage: 4.6, totalScore: 214.6, nationalRank: 194, nvRank: 3 },
  { teamId: '18-1541', teamName: 'Hog Riders', linux: 95, windowsDesktop: 95, windowsServer: null, packetQuiz: 10, packetImage: 14.4, totalScore: 214.4, nationalRank: 197, nvRank: 4 },
  { teamId: '18-1537', teamName: 'Cybatron 2.0', linux: 100, windowsDesktop: 100, windowsServer: null, packetQuiz: 10, packetImage: 1.6, adjustments: -5, totalScore: 206.6, nationalRank: 344, nvRank: 7 },
  { teamId: '18-1534', teamName: 'Keyboard Krumbs', linux: 90, windowsDesktop: 90, windowsServer: null, packetQuiz: 10, packetImage: 15.2, totalScore: 205.2, nationalRank: 367, nvRank: 8 },
  { teamId: '18-1536', teamName: 'Overclocked', linux: 85, windowsDesktop: 95, windowsServer: null, packetQuiz: 10, packetImage: 13.6, adjustments: -5, totalScore: 198.6, nationalRank: 498, nvRank: 11 },
  { teamId: '18-1532', teamName: 'Road2Plat', linux: 85, windowsDesktop: 90, windowsServer: null, packetQuiz: 10, packetImage: 15.0, adjustments: -5, totalScore: 195.0, nationalRank: 564, nvRank: 14 },
  { teamId: '18-1543', teamName: 'BirdBrains', linux: 80, windowsDesktop: 95, windowsServer: null, packetQuiz: 6, packetImage: 9.8, totalScore: 190.8, nationalRank: 633, nvRank: 16 },
  { teamId: '18-1533', teamName: 'Five Guys', linux: 95, windowsDesktop: 70, windowsServer: null, packetQuiz: 10, packetImage: 11.2, totalScore: 186.2, nationalRank: 717, nvRank: 17 },
  { teamId: '18-1545', teamName: 'Silk Road', linux: 79, windowsDesktop: 86, windowsServer: null, packetQuiz: 10, packetImage: 14.6, adjustments: -10, totalScore: 179.6, nationalRank: 836, nvRank: 20 },
  { teamId: '18-1538', teamName: 'Super Sonic Racing', linux: 70, windowsDesktop: 83, windowsServer: null, packetQuiz: 10, packetImage: 8.4, totalScore: 171.4, nationalRank: 980, nvRank: 29 },
  { teamId: '18-1546', teamName: 'The Freshies', linux: 90, windowsDesktop: 56, windowsServer: null, packetQuiz: 9, packetImage: 10.6, adjustments: -5, totalScore: 160.6, nationalRank: 1171, nvRank: 35 },
  { teamId: '18-1540', teamName: 'WeAreTheGrandCanyon', linux: 80, windowsDesktop: 42, windowsServer: null, packetQuiz: 10, packetImage: 5.0, totalScore: 137.0, nationalRank: 1515, nvRank: 44 },
  { teamId: '18-1542', teamName: 'Hexadecigals', linux: 54, windowsDesktop: 70, windowsServer: null, packetQuiz: 10, packetImage: 0.0, totalScore: 134.0, nationalRank: 1545, nvRank: 46 },
  { teamId: '18-1544', teamName: 'Cyber Tygers', linux: 26, windowsDesktop: 68, windowsServer: null, packetQuiz: 10, packetImage: 4.0, adjustments: -10, totalScore: 98.0, nationalRank: 1784, nvRank: 53 },
  { teamId: '18-1547', teamName: 'No Entry', linux: 42, windowsDesktop: 20, windowsServer: null, packetQuiz: 9, packetImage: 10.4, totalScore: 81.4, nationalRank: 1835, nvRank: 54 },
]

const s2526_r2 = [
  { teamId: '18-1535', teamName: 'Shake and Bake', linux: 100, windowsDesktop: 96, windowsServer: 81, packetQuiz: 10, packetImage: 19.2, totalScore: 306.2, nationalRank: 91, nvRank: 2 },
  { teamId: '18-1539', teamName: 'AFR', linux: 90, windowsDesktop: 100, windowsServer: 85, packetQuiz: 10, packetImage: 15.6, totalScore: 300.6, nationalRank: 127, nvRank: 3 },
  { teamId: '18-1534', teamName: 'Keyboard Krumbs', linux: 74, windowsDesktop: 92, windowsServer: 81, packetQuiz: 10, packetImage: 18.4, totalScore: 275.4, nationalRank: 277, nvRank: null },
  { teamId: '18-1543', teamName: 'BirdBrains', linux: 78, windowsDesktop: 92, windowsServer: 81, packetQuiz: 10, packetImage: 17.8, adjustments: -5, totalScore: 273.8, nationalRank: 287, nvRank: null },
  { teamId: '18-1545', teamName: 'Silk Road', linux: 66, windowsDesktop: 86, windowsServer: 78, packetQuiz: 10, packetImage: 16.6, totalScore: 256.6, nationalRank: 423, nvRank: null },
  { teamId: '18-1537', teamName: 'Cybatron 2.0', linux: 82, windowsDesktop: 92, windowsServer: 59, packetQuiz: 10, packetImage: 10.6, totalScore: 253.6, nationalRank: 458, nvRank: null },
  { teamId: '18-1532', teamName: 'Road2Plat', linux: 68, windowsDesktop: 72, windowsServer: 73, packetQuiz: 10, packetImage: 19.2, totalScore: 242.2, nationalRank: 556, nvRank: null },
  { teamId: '18-1533', teamName: 'Five Guys', linux: 83, windowsDesktop: 71, windowsServer: 67, packetQuiz: 10, packetImage: 11.2, adjustments: -5, totalScore: 237.2, nationalRank: 611, nvRank: null },
  { teamId: '18-1536', teamName: 'Overclocked', linux: 70, windowsDesktop: 74, windowsServer: 64, packetQuiz: 10, packetImage: 18.8, totalScore: 236.8, nationalRank: 626, nvRank: null },
  { teamId: '18-1541', teamName: 'Hog Riders', linux: 82, windowsDesktop: 81, windowsServer: 32, packetQuiz: 10, packetImage: 0.0, totalScore: 205.0, nationalRank: 934, nvRank: null },
  { teamId: '18-1544', teamName: 'Cyber Tygers', linux: 60, windowsDesktop: 53, windowsServer: 34, packetQuiz: 10, packetImage: 15.6, totalScore: 172.6, nationalRank: 1258, nvRank: null },
  { teamId: '18-1538', teamName: 'Super Sonic Racing', linux: 53, windowsDesktop: 47, windowsServer: 40, packetQuiz: 10, packetImage: 18.8, totalScore: 168.8, nationalRank: 1283, nvRank: null },
  { teamId: '18-1542', teamName: 'Hexadecigals', linux: 45, windowsDesktop: 73, windowsServer: 18, packetQuiz: 10, packetImage: 10.4, adjustments: -5, totalScore: 151.4, nationalRank: 1419, nvRank: null },
  { teamId: '18-1546', teamName: 'The Freshies', linux: 59, windowsDesktop: 57, windowsServer: 5, packetQuiz: 10, packetImage: 9.6, totalScore: 140.6, nationalRank: 1494, nvRank: null },
  { teamId: '18-1540', teamName: 'WeAreTheGrandCanyon', linux: 71, windowsDesktop: 5, windowsServer: 12, packetQuiz: 10, packetImage: 6.2, totalScore: 104.2, nationalRank: 1690, nvRank: null },
]

const s2526_state = [
  { teamId: '18-1535', teamName: 'Shake and Bake', linux: 57, windowsDesktop: 70, windowsServer: 50, packetTracer: 83.2, totalScore: 260.2, nationalRank: 111, nvRank: 2, advanced: true, tier: 'Platinum' },
  { teamId: '18-1539', teamName: 'AFR', linux: 60, windowsDesktop: 65, windowsServer: 47, packetTracer: 72.5, totalScore: 244.5, nationalRank: 144, nvRank: 4, advanced: true, tier: 'Platinum' },
  { teamId: '18-1543', teamName: 'BirdBrains', linux: 38, windowsDesktop: 54, windowsServer: 34, packetTracer: 85.3, totalScore: 211.3, nationalRank: 289, nvRank: 7, advanced: false, tier: 'Platinum' },
  { teamId: '18-1532', teamName: 'Road2Plat', linux: 41, windowsDesktop: 44, windowsServer: 34, packetTracer: 77.4, totalScore: 196.4, nationalRank: 361, nvRank: 8, advanced: false, tier: 'Platinum' },
  { teamId: '18-1536', teamName: 'Overclocked', linux: 40, windowsDesktop: 54, windowsServer: 46, adjustments: -17, packetTracer: 71.3, totalScore: 194.3, nationalRank: 380, nvRank: 9, advanced: false, tier: 'Platinum' },
  { teamId: '18-1545', teamName: 'Silk Road', linux: 30, windowsDesktop: 51, windowsServer: 40, packetTracer: 72.5, totalScore: 193.5, nationalRank: 382, nvRank: 10, advanced: false, tier: 'Gold' },
  { teamId: '18-1534', teamName: 'Keyboard Krumbs', linux: 36, windowsDesktop: 42, windowsServer: 43, packetTracer: 71.1, totalScore: 192.1, nationalRank: 391, nvRank: 11, advanced: false, tier: 'Gold' },
  { teamId: '18-1537', teamName: 'Cybatron 2.0', linux: 36, windowsDesktop: 51, windowsServer: 36, packetTracer: 64.3, totalScore: 187.3, nationalRank: 420, nvRank: 13, advanced: false, tier: 'Gold' },
  { teamId: '18-1533', teamName: 'Five Guys', linux: 57, windowsDesktop: 56, windowsServer: 15, packetTracer: 88.1, totalScore: 216.1, nationalRank: 32, nvRank: 1, advanced: true, tier: 'Gold' },
  { teamId: '18-1541', teamName: 'Hog Riders', linux: 69, windowsDesktop: 53, windowsServer: 32, packetTracer: 52.2, totalScore: 206.2, nationalRank: 47, nvRank: 2, advanced: true, tier: 'Gold' },
  { teamId: '18-1538', teamName: 'Super Sonic Racing', linux: 50, windowsDesktop: 40, windowsServer: 26, packetTracer: 78.3, totalScore: 194.3, nationalRank: 79, nvRank: 5, advanced: true, tier: 'Gold' },
  { teamId: '18-1546', teamName: 'The Freshies', linux: 13, windowsDesktop: 33, windowsServer: 31, packetTracer: 55.0, totalScore: 132.0, nationalRank: 415, nvRank: 16, advanced: false, tier: 'Gold' },
  { teamId: '18-1542', teamName: 'Hexadecigals', linux: 24, windowsDesktop: 65, windowsServer: 20, packetTracer: 75.3, totalScore: 184.3, nationalRank: 6, nvRank: 1, advanced: true, tier: 'Silver' },
  { teamId: '18-1540', teamName: 'WeAreTheGrandCanyon', linux: 44, windowsDesktop: 40, windowsServer: 11, packetTracer: 70.6, totalScore: 165.6, nationalRank: 19, nvRank: 3, advanced: true, tier: 'Silver' },
  { teamId: '18-1544', teamName: 'Cyber Tygers', linux: 28, windowsDesktop: 20, windowsServer: 20, adjustments: -5, packetTracer: 63.6, totalScore: 126.6, nationalRank: 71, nvRank: 9, advanced: true, tier: 'Silver' },
]

const s2526_semis = [
  { teamId: '18-1539', teamName: 'AFR', linux: 42, windowsDesktop: null, windowsServer: 24, windowsServer2: 45, webBased: 80, ptQuiz: 72, ptImage: 45.03, totalScore: 308.03, nationalRank: 88, nvRank: 3, tier: 'Platinum' },
  { teamId: '18-1535', teamName: 'Shake and Bake', linux: 27, windowsDesktop: null, windowsServer: 16, windowsServer2: 28, webBased: 80, ptQuiz: 72, ptImage: 77.94, totalScore: 300.94, nationalRank: 97, nvRank: 4, tier: 'Platinum' },
  { teamId: '18-1533', teamName: 'Five Guys', linux: 45, windowsDesktop: null, windowsServer: 28, windowsServer2: 36, webBased: 45, ptQuiz: 30, ptImage: 20.93, totalScore: 204.93, nationalRank: 16, nvRank: 1, tier: 'Gold' },
  { teamId: '18-1541', teamName: 'Hog Riders', linux: 37, windowsDesktop: null, windowsServer: 22, windowsServer2: 34, webBased: 62, ptQuiz: 30, ptImage: 13.71, totalScore: 198.71, nationalRank: 25, nvRank: 3, tier: 'Gold' },
  { teamId: '18-1538', teamName: 'Super Sonic Racing', linux: 31, windowsDesktop: null, windowsServer: 3, windowsServer2: 21, webBased: 17, ptQuiz: 30, ptImage: 21.65, totalScore: 123.65, nationalRank: 97, nvRank: 5, tier: 'Gold' },
  { teamId: '18-1540', teamName: 'WeAreTheGrandCanyon', linux: 34, windowsDesktop: null, windowsServer: 19, windowsServer2: null, webBased: null, ptQuiz: 30, ptImage: 18.76, totalScore: 101.76, nationalRank: 2, nvRank: 1, tier: 'Silver' },
  { teamId: '18-1544', teamName: 'Cyber Tygers', linux: 21, windowsDesktop: null, windowsServer: 31, windowsServer2: null, webBased: null, ptQuiz: 27, ptImage: 18.04, totalScore: 97.04, nationalRank: 4, nvRank: 2, tier: 'Silver' },
  { teamId: '18-1542', teamName: 'Hexadecigals', linux: 8, windowsDesktop: null, windowsServer: 27, windowsServer2: null, webBased: null, ptQuiz: 30, ptImage: 31.03, totalScore: 96.03, nationalRank: 5, nvRank: 3, tier: 'Silver' },
]

// Season 24-25
const s2425_r1 = [
  { teamId: '17-1748', teamName: 'Surveillance Van 5', linux: 100, windowsDesktop: 100, windowsServer: 0, packetBonus: 5, totalScore: 205, nationalRank: 23, nvRank: 2 },
  { teamId: '17-1752', teamName: 'Sigma Sigma on the Wall', linux: 100, windowsDesktop: 100, windowsServer: 0, packetBonus: 5, totalScore: 205, nationalRank: 119, nvRank: 4 },
  { teamId: '17-1757', teamName: 'Shake -n- Bake', linux: 100, windowsDesktop: 100, windowsServer: 0, packetBonus: 5, totalScore: 205, nationalRank: 174, nvRank: 6 },
  { teamId: '17-1754', teamName: 'The Cyber Ninjas', linux: 100, windowsDesktop: 100, windowsServer: 0, packetBonus: 5, totalScore: 205, nationalRank: 222, nvRank: 7 },
  { teamId: '17-1821', teamName: 'AFR', linux: 100, windowsDesktop: 95, windowsServer: 0, packetBonus: 5, totalScore: 200, nationalRank: 429, nvRank: 9 },
  { teamId: '17-1764', teamName: 'The Jittleyangs', linux: 100, windowsDesktop: 95, windowsServer: 0, packetBonus: 5, totalScore: 200, nationalRank: 443, nvRank: 10 },
  { teamId: '17-1760', teamName: 'Keyboard Krumbs', linux: 89, windowsDesktop: 100, windowsServer: 0, packetBonus: 5, totalScore: 194, nationalRank: 673, nvRank: 15 },
  { teamId: '17-1822', teamName: 'Impeach Jed Paley', linux: 88, windowsDesktop: 100, windowsServer: 0, packetBonus: 5, totalScore: 193, nationalRank: 683, nvRank: 16 },
  { teamId: '17-1761', teamName: 'El Dinero', linux: 95, windowsDesktop: 90, windowsServer: 0, packetBonus: 5, adjustments: -5, totalScore: 185, nationalRank: 858, nvRank: 19 },
  { teamId: '17-3427', teamName: 'BetterThanYou!', linux: 94, windowsDesktop: 80, windowsServer: 0, packetBonus: 5, totalScore: 179, nationalRank: 1034, nvRank: 25 },
  { teamId: '17-1762', teamName: 'MGMs Top Gamblers', linux: 71, windowsDesktop: 80, windowsServer: 0, packetBonus: 5, totalScore: 156, nationalRank: 1430, nvRank: 35 },
  { teamId: '17-1758', teamName: 'Little Berrykins', linux: 68, windowsDesktop: 71, windowsServer: 0, packetBonus: 5, totalScore: 144, nationalRank: 1572, nvRank: 38 },
  { teamId: '17-1824', teamName: 'Silk Road', linux: 58, windowsDesktop: 75, windowsServer: 0, packetBonus: 5, totalScore: 138, nationalRank: 1641, nvRank: 40 },
  { teamId: '17-1763', teamName: 'The Benchwarmers', linux: 48, windowsDesktop: 85, windowsServer: 0, packetBonus: 5, totalScore: 138, nationalRank: 1641, nvRank: 41 },
  { teamId: '17-3428', teamName: 'Cybatron', linux: 62, windowsDesktop: 61, windowsServer: 0, packetBonus: 5, adjustments: -10, totalScore: 118, nationalRank: 1794, nvRank: 45 },
  { teamId: '17-1823', teamName: 'Wiggle Warriors', linux: 51, windowsDesktop: 66, windowsServer: 0, packetBonus: 5, adjustments: -5, totalScore: 117, nationalRank: 1804, nvRank: 46 },
  { teamId: '17-1825', teamName: 'No Entry', linux: 78, windowsDesktop: 42, windowsServer: 0, packetBonus: 5, adjustments: -10, totalScore: 115, nationalRank: 1820, nvRank: 47 },
]

const s2425_r2 = [
  { teamId: '17-1757', teamName: 'Shake -n- Bake', linux: 67, windowsDesktop: 94, windowsServer: 75, packetBonus: 23.86, totalScore: 259.86, nationalRank: null, nvRank: null },
  { teamId: '17-1754', teamName: 'The Cyber Ninjas', linux: 61, windowsDesktop: 95, windowsServer: 75, packetBonus: 25.29, totalScore: 256.29, nationalRank: null, nvRank: null },
  { teamId: '17-1748', teamName: 'Surveillance Van 5', linux: 70, windowsDesktop: 91, windowsServer: 66, packetBonus: 24.57, totalScore: 251.57, nationalRank: null, nvRank: null },
  { teamId: '17-1821', teamName: 'AFR', linux: 66, windowsDesktop: 94, windowsServer: 75, packetBonus: 12.71, totalScore: 247.71, nationalRank: null, nvRank: null },
  { teamId: '17-1752', teamName: 'Sigma Sigma on the Wall', linux: 60, windowsDesktop: 94, windowsServer: 73, packetBonus: 18.71, totalScore: 245.71, nationalRank: null, nvRank: null },
  { teamId: '17-3427', teamName: 'BetterThanYou!', linux: 61, windowsDesktop: 89, windowsServer: 80, packetBonus: 15.57, totalScore: 245.57, nationalRank: null, nvRank: null },
  { teamId: '17-1760', teamName: 'Keyboard Krumbs', linux: 52, windowsDesktop: 89, windowsServer: 69, packetBonus: 17.86, totalScore: 227.86, nationalRank: null, nvRank: null },
  { teamId: '17-1763', teamName: 'The Benchwarmers', linux: 58, windowsDesktop: 80, windowsServer: 64, packetBonus: 19.71, totalScore: 221.71, nationalRank: null, nvRank: null },
  { teamId: '17-1761', teamName: 'El Dinero', linux: 55, windowsDesktop: 95, windowsServer: 57, packetBonus: 16.14, adjustments: -10, totalScore: 213.14, nationalRank: null, nvRank: null },
  { teamId: '17-1764', teamName: 'The Jittleyangs', linux: 66, windowsDesktop: 94, windowsServer: 29, packetBonus: 15.57, totalScore: 204.57, nationalRank: null, nvRank: null },
  { teamId: '17-1822', teamName: 'Impeach Jed Paley', linux: 51, windowsDesktop: 70, windowsServer: 66, packetBonus: 16.29, totalScore: 203.29, nationalRank: null, nvRank: null },
  { teamId: '17-1762', teamName: 'MGMs Top Gamblers', linux: 57, windowsDesktop: 51, windowsServer: 59, packetBonus: 9.43, totalScore: 176.43, nationalRank: null, nvRank: null },
  { teamId: '17-1823', teamName: 'Wiggle Warriors', linux: 43, windowsDesktop: 79, windowsServer: 39, packetBonus: 11.43, totalScore: 172.43, nationalRank: null, nvRank: null },
  { teamId: '17-3428', teamName: 'Cybatron', linux: 58, windowsDesktop: 47, windowsServer: 31, packetBonus: 10.43, totalScore: 146.43, nationalRank: null, nvRank: null },
  { teamId: '17-1824', teamName: 'Silk Road', linux: 61, windowsDesktop: 37, windowsServer: 33, packetBonus: 14, totalScore: 145, nationalRank: null, nvRank: null },
  { teamId: '17-1758', teamName: 'Little Berrykins', linux: 33, windowsDesktop: 42, windowsServer: 28, packetBonus: 14.71, totalScore: 117.71, nationalRank: null, nvRank: null },
  { teamId: '17-1825', teamName: 'No Entry', linux: 12, windowsDesktop: 52, windowsServer: 24, packetBonus: 9, totalScore: 97, nationalRank: null, nvRank: null },
]

const s2425_state = [
  { teamId: '17-1748', teamName: 'Surveillance Van 5', linux: 53, windowsDesktop: 78, windowsServer: 75, packetTracer: 94, totalScore: 300, nationalRank: 63, nvRank: 2, advanced: false, tier: 'Platinum' },
  { teamId: '17-1757', teamName: 'Shake -n- Bake', linux: 39, windowsDesktop: 67, windowsServer: 54, packetTracer: 83, totalScore: 243, nationalRank: 251, nvRank: 4, advanced: false, tier: 'Platinum' },
  { teamId: '17-1754', teamName: 'The Cyber Ninjas', linux: 43, windowsDesktop: 58, windowsServer: 51, packetTracer: 90, totalScore: 242, nationalRank: 258, nvRank: 5, advanced: false, tier: 'Platinum' },
  { teamId: '17-1752', teamName: 'Sigma Sigma on the Wall', linux: 49, windowsDesktop: 63, windowsServer: 64, packetTracer: 64, totalScore: 240, nationalRank: 271, nvRank: 6, advanced: false, tier: 'Platinum' },
  { teamId: '17-1764', teamName: 'The Jittleyangs', linux: 40, windowsDesktop: 51, windowsServer: 40, packetTracer: 63, totalScore: 194, nationalRank: 476, nvRank: 8, advanced: false, tier: 'Platinum' },
  { teamId: '17-1760', teamName: 'Keyboard Krumbs', linux: 25, windowsDesktop: 54, windowsServer: 69, packetTracer: 40, totalScore: 188, nationalRank: 507, nvRank: 9, advanced: false, tier: 'Platinum' },
  { teamId: '17-3427', teamName: 'BetterThanYou!', linux: 49, windowsDesktop: 57, windowsServer: 49, packetTracer: 32, totalScore: 187, nationalRank: 509, nvRank: 10, advanced: false, tier: 'Platinum' },
  { teamId: '17-1761', teamName: 'El Dinero', linux: 47, windowsDesktop: 47, windowsServer: 45, packetTracer: 48, totalScore: 187, nationalRank: 510, nvRank: 11, advanced: false, tier: 'Platinum' },
  { teamId: '17-1821', teamName: 'AFR', linux: 34, windowsDesktop: 52, windowsServer: 53, packetTracer: 37, totalScore: 176, nationalRank: 551, nvRank: 13, advanced: false, tier: 'Platinum' },
  { teamId: '17-1763', teamName: 'The Benchwarmers', linux: 51, windowsDesktop: 57, windowsServer: 47, packetTracer: 78, totalScore: 233, nationalRank: 41, nvRank: 2, advanced: true, tier: 'Gold' },
  { teamId: '17-1822', teamName: 'Impeach Jed Paley', linux: 45, windowsDesktop: 34, windowsServer: 43, packetTracer: 90, totalScore: 212, nationalRank: 99, nvRank: 4, advanced: true, tier: 'Gold' },
  { teamId: '17-1762', teamName: 'MGMs Top Gamblers', linux: 37, windowsDesktop: 21, windowsServer: 42, packetTracer: 21, totalScore: 121, nationalRank: 655, nvRank: 17, advanced: false, tier: 'Gold' },
  { teamId: '17-1824', teamName: 'Silk Road', linux: 53, windowsDesktop: 42, windowsServer: 61, packetTracer: 73, totalScore: 229, nationalRank: 4, nvRank: 1, advanced: true, tier: 'Silver' },
  { teamId: '17-1823', teamName: 'Wiggle Warriors', linux: 49, windowsDesktop: 51, windowsServer: 64, packetTracer: 33, totalScore: 197, nationalRank: 13, nvRank: 2, advanced: true, tier: 'Silver' },
  { teamId: '17-3428', teamName: 'Cybatron', linux: 53, windowsDesktop: 48, windowsServer: 37, packetTracer: 27, totalScore: 165, nationalRank: 38, nvRank: 3, advanced: false, tier: 'Silver' },
  { teamId: '17-1758', teamName: 'Little Berrykins', linux: 24, windowsDesktop: 9, windowsServer: 28, packetTracer: 53, totalScore: 114, nationalRank: 173, nvRank: 7, advanced: false, tier: 'Silver' },
  { teamId: '17-1825', teamName: 'No Entry', linux: 12, windowsDesktop: 15, windowsServer: 17, packetTracer: 21, totalScore: 65, nationalRank: 451, nvRank: 12, advanced: false, tier: 'Silver' },
]

const s2425_semis = [
  { teamId: '17-1748', teamName: 'Surveillance Van 5', linux: 43, windowsDesktop: 53, windowsServer: 53, cisco: 182.33, boeing: 26.67, web: 19, adjustments: -20, totalScore: 356.0, nationalRank: 61, tier: 'Platinum' },
  { teamId: '17-1763', teamName: 'The Benchwarmers', linux: 18, windowsDesktop: 25, windowsServer: 25, cisco: 38.32, boeing: 29.33, web: null, adjustments: -20, totalScore: 115.65, nationalRank: 102, tier: 'Gold' },
  { teamId: '17-1822', teamName: 'Impeach Jed Paley', linux: 18, windowsDesktop: 4, windowsServer: 4, cisco: 49.55, boeing: 0, web: null, totalScore: 75.55, nationalRank: 145, tier: 'Gold' },
  { teamId: '17-1824', teamName: 'Silk Road', linux: null, windowsDesktop: 29, windowsServer: 29, cisco: 18.88, boeing: 16, web: null, totalScore: 95.88, nationalRank: 32, tier: 'Silver' },
  { teamId: '17-1823', teamName: 'Wiggle Warriors', linux: null, windowsDesktop: 4, windowsServer: 4, cisco: 11.65, boeing: 32, web: null, totalScore: 95.65, nationalRank: 46, tier: 'Silver' },
  { teamId: '17-3428', teamName: 'Cybatron', linux: null, windowsDesktop: 6, windowsServer: 6, cisco: 18.53, boeing: 13.33, web: null, totalScore: 86.86, nationalRank: 53, tier: 'Silver' },
]

// Season 23-24 (partial — Round 2 only from spreadsheet)
const s2324_r2 = [
  { teamId: '16-2029', teamName: 'Surveillance Van 5', linux: 82, windowsDesktop: 100, windowsServer: 74, packetTracer: 17.4, totalScore: 273.4, nationalRank: 115, nvRank: 2 },
  { teamId: '16-2036', teamName: '0BJECTX', linux: 43, windowsDesktop: 100, windowsServer: 65, packetTracer: 22.2, adjustments: -10, totalScore: 220.2, nationalRank: 487, nvRank: 5 },
  { teamId: '16-2032', teamName: 'El"Ly"minated', linux: 60, windowsDesktop: 65, windowsServer: 64, packetTracer: 25.2, totalScore: 214.2, nationalRank: 550, nvRank: 7 },
  { teamId: '16-2034', teamName: 'One Justin and Four Juniors', linux: 53, windowsDesktop: 91, windowsServer: 50, packetTracer: 18, totalScore: 212.0, nationalRank: 569, nvRank: 9 },
  { teamId: '16-2037', teamName: 'Penguin Packet People', linux: 59, windowsDesktop: 91, windowsServer: 53, packetTracer: 18.9, adjustments: -12, totalScore: 209.9, nationalRank: 602, nvRank: 10 },
  { teamId: '16-2027', teamName: 'The Starfielders', linux: 31, windowsDesktop: 90, windowsServer: 64, packetTracer: 22.8, totalScore: 207.8, nationalRank: 621, nvRank: 11 },
  { teamId: '16-2028', teamName: 'CtrlAltDefeat', linux: 50, windowsDesktop: 87, windowsServer: 55, packetTracer: 0, totalScore: 192.0, nationalRank: 794, nvRank: 13 },
  { teamId: '16-2033', teamName: 'Nico and Friends', linux: 20, windowsDesktop: 100, windowsServer: 68, packetTracer: 15.6, adjustments: -14, totalScore: 189.6, nationalRank: 819, nvRank: 14 },
  { teamId: '16-2051', teamName: 'Swit', linux: 47, windowsDesktop: 67, windowsServer: 40, packetTracer: 11.7, totalScore: 165.7, nationalRank: 1090, nvRank: 20 },
  { teamId: '16-2048', teamName: 'Anonymous 2.0', linux: 24, windowsDesktop: 75, windowsServer: 58, packetTracer: 17.1, adjustments: -10, totalScore: 164.1, nationalRank: 1105, nvRank: 22 },
  { teamId: '16-2031', teamName: 'Sweet & Sour', linux: 30, windowsDesktop: 85, windowsServer: 37, packetTracer: 12, totalScore: 164.0, nationalRank: 1110, nvRank: 23 },
  { teamId: '16-2035', teamName: 'TBA', linux: 20, windowsDesktop: 55, windowsServer: 45, packetTracer: 9, totalScore: 129.0, nationalRank: 1443, nvRank: 30 },
  { teamId: '16-2045', teamName: 'BetterThanU', linux: 27, windowsDesktop: 52, windowsServer: 26, packetTracer: 8.4, totalScore: 113.4, nationalRank: 1594, nvRank: 36 },
  { teamId: '16-2052', teamName: 'No Name', linux: 37, windowsDesktop: 40, windowsServer: 0, packetTracer: 8, totalScore: 85.0, nationalRank: 1798, nvRank: 45 },
]

// Season 22-23
const s2223_r1 = [
  { teamId: '15-1339', teamName: 'Cacada', linux: 100, windowsDesktop: 100, windowsServer: null, totalScore: 200, nationalRank: null, nvRank: 1 },
  { teamId: '15-1336', teamName: 'Burgers and fries', linux: 87, windowsDesktop: 90, windowsServer: null, totalScore: 177, nationalRank: null, nvRank: 2 },
  { teamId: '15-1340', teamName: 'CyberHelix', linux: 90, windowsDesktop: 85, windowsServer: null, totalScore: 175, nationalRank: null, nvRank: 3 },
  { teamId: '15-1333', teamName: 'The Cyberpunks :)', linux: 80, windowsDesktop: 87, windowsServer: null, adjustments: -5, totalScore: 162, nationalRank: null, nvRank: 4 },
  { teamId: '15-1344', teamName: 'Trojans', linux: 70, windowsDesktop: 86, windowsServer: null, totalScore: 156, nationalRank: null, nvRank: 5 },
  { teamId: '15-0901', teamName: 'Port Authority 2.0', linux: 70, windowsDesktop: 76, windowsServer: null, totalScore: 146, nationalRank: null, nvRank: 6 },
  { teamId: '15-1334', teamName: 'Salinity', linux: 73, windowsDesktop: 56, windowsServer: null, totalScore: 129, nationalRank: null, nvRank: 7 },
  { teamId: '15-1343', teamName: 'Twilight Sparkle', linux: 66, windowsDesktop: 60, windowsServer: null, totalScore: 126, nationalRank: null, nvRank: 8 },
  { teamId: '15-0898', teamName: 'Nirvana', linux: 64, windowsDesktop: 50, windowsServer: null, totalScore: 114, nationalRank: null, nvRank: 9 },
  { teamId: '15-0900', teamName: 'CyberSaints', linux: 79, windowsDesktop: 32, windowsServer: null, totalScore: 111, nationalRank: null, nvRank: 10 },
  { teamId: '15-1337', teamName: 'One Christian and Three Sophomores', linux: 69, windowsDesktop: 41, windowsServer: null, totalScore: 110, nationalRank: null, nvRank: 11 },
  { teamId: '15-1342', teamName: 'Cypurr', linux: 27, windowsDesktop: 68, windowsServer: null, totalScore: 95, nationalRank: null, nvRank: 12 },
  { teamId: '15-0899', teamName: 'Cyber curtains', linux: 21, windowsDesktop: 45, windowsServer: null, totalScore: 66, nationalRank: null, nvRank: 13 },
  { teamId: '15-1335', teamName: 'Cyberbros', linux: 0, windowsDesktop: 28, windowsServer: null, totalScore: 28, nationalRank: null, nvRank: 14 },
]

const s2223_r2 = [
  { teamId: '15-1339', teamName: 'Cacada', linux: 68, windowsDesktop: 75, windowsServer: 69, packetTracer: 18.71, adjustments: -10, totalScore: 220.71, nationalRank: null, nvRank: 1 },
  { teamId: '15-1343', teamName: 'Twilight Sparkle', linux: 40, windowsDesktop: 76, windowsServer: 39, packetTracer: 17.14, totalScore: 172.14, nationalRank: null, nvRank: 2 },
  { teamId: '15-1336', teamName: 'Burgers and fries', linux: 37, windowsDesktop: 63, windowsServer: 59, packetTracer: 11.14, totalScore: 170.14, nationalRank: null, nvRank: 3 },
  { teamId: '15-1340', teamName: 'CyberHelix', linux: 45, windowsDesktop: 61, windowsServer: 41, packetTracer: 15.14, totalScore: 162.14, nationalRank: null, nvRank: 4 },
  { teamId: '15-0900', teamName: 'CyberSaints', linux: 33, windowsDesktop: 44, windowsServer: 58, packetTracer: 25.71, totalScore: 160.71, nationalRank: null, nvRank: 5 },
  { teamId: '15-0901', teamName: 'Port Authority 2.0', linux: 19, windowsDesktop: 55, windowsServer: 60, packetTracer: 10.57, totalScore: 144.57, nationalRank: null, nvRank: 6 },
  { teamId: '15-1334', teamName: 'Salinity', linux: 23, windowsDesktop: 41, windowsServer: 44, packetTracer: 24.43, totalScore: 132.43, nationalRank: null, nvRank: 7 },
  { teamId: '15-1344', teamName: 'Trojans', linux: 18, windowsDesktop: 43, windowsServer: 57, packetTracer: 10.86, totalScore: 128.86, nationalRank: null, nvRank: 8 },
  { teamId: '15-0899', teamName: 'Cyber curtains', linux: 19, windowsDesktop: 41, windowsServer: 40, packetTracer: 2.29, totalScore: 102.29, nationalRank: null, nvRank: 9 },
  { teamId: '15-1337', teamName: 'One Christian and Three Sophomores', linux: 37, windowsDesktop: 28, windowsServer: 23, packetTracer: 11.71, totalScore: 99.71, nationalRank: null, nvRank: 10 },
  { teamId: '15-1333', teamName: 'The Cyberpunks :)', linux: 28, windowsDesktop: 51, windowsServer: 35, packetTracer: 2.86, adjustments: -20, totalScore: 96.86, nationalRank: null, nvRank: 11 },
  { teamId: '15-0898', teamName: 'Nirvana', linux: 19, windowsDesktop: 37, windowsServer: 40, packetTracer: 0, totalScore: 96.0, nationalRank: null, nvRank: 12 },
  { teamId: '15-1342', teamName: 'Cypurr', linux: 14, windowsDesktop: 37, windowsServer: 21, packetTracer: 6.29, totalScore: 78.29, nationalRank: null, nvRank: 13 },
  { teamId: '15-1335', teamName: 'Cyberbros', linux: 11, windowsDesktop: 15, windowsServer: 0, packetTracer: 6, totalScore: 32.0, nationalRank: null, nvRank: 14 },
]

const s2223_state = [
  { teamId: '15-1339', teamName: 'Cacada', linux: 24, windowsDesktop: 54, windowsServer: 41, packetTracer: 66, totalScore: 185, nationalRank: null, nvRank: 1, advanced: true, tier: 'Platinum' },
  { teamId: '15-1336', teamName: 'Burgers and fries', linux: 19, windowsDesktop: 49, windowsServer: 19, packetTracer: 57, adjustments: -2, totalScore: 142, nationalRank: null, nvRank: 2, advanced: false, tier: 'Platinum' },
  { teamId: '15-1340', teamName: 'CyberHelix', linux: 13, windowsDesktop: 46, windowsServer: 8, packetTracer: 54, totalScore: 121, nationalRank: null, nvRank: 3, advanced: false, tier: 'Platinum' },
  { teamId: '15-0900', teamName: 'CyberSaints', linux: 54, windowsDesktop: 32, windowsServer: 19, packetTracer: 77, totalScore: 182, nationalRank: null, nvRank: 1, advanced: true, tier: 'Gold' },
  { teamId: '15-1333', teamName: 'The Cyberpunks :)', linux: 40, windowsDesktop: 53, windowsServer: 26, packetTracer: 30, totalScore: 149, nationalRank: null, nvRank: 2, advanced: true, tier: 'Gold' },
  { teamId: '15-1334', teamName: 'Salinity', linux: 22, windowsDesktop: 40, windowsServer: 19, packetTracer: 57, totalScore: 138, nationalRank: null, nvRank: 3, advanced: true, tier: 'Gold' },
  { teamId: '15-0901', teamName: 'Port Authority 2.0', linux: 47, windowsDesktop: 31, windowsServer: 22, packetTracer: 28, totalScore: 128, nationalRank: null, nvRank: 4, advanced: true, tier: 'Gold' },
  { teamId: '15-1343', teamName: 'Twilight Sparkle', linux: 31, windowsDesktop: 65, windowsServer: -5, packetTracer: 28, totalScore: 119, nationalRank: null, nvRank: 5, advanced: true, tier: 'Gold' },
  { teamId: '15-1344', teamName: 'Trojans', linux: 22, windowsDesktop: 17, windowsServer: 24, packetTracer: 44, totalScore: 107, nationalRank: null, nvRank: 6, advanced: false, tier: 'Gold' },
  { teamId: '15-1337', teamName: 'One Christian and Three Sophomores', linux: 24, windowsDesktop: 7, windowsServer: 0, packetTracer: 23, totalScore: 54, nationalRank: null, nvRank: 7, advanced: false, tier: 'Gold' },
  { teamId: '15-0898', teamName: 'Nirvana', linux: 18, windowsDesktop: 13, windowsServer: 0, packetTracer: 0, totalScore: 31, nationalRank: null, nvRank: 8, advanced: false, tier: 'Gold' },
  { teamId: '15-0899', teamName: 'Cyber curtains', linux: 36, windowsDesktop: 37, windowsServer: 52, packetTracer: 8.71, totalScore: 133.71, nationalRank: null, nvRank: 1, advanced: true, tier: 'Silver' },
  { teamId: '15-1342', teamName: 'Cypurr', linux: 18, windowsDesktop: 6, windowsServer: 9, packetTracer: 7.14, totalScore: 40.14, nationalRank: null, nvRank: 2, advanced: false, tier: 'Silver' },
  { teamId: '15-1335', teamName: 'Cyberbros', linux: 18, windowsDesktop: -7, windowsServer: 12, packetTracer: 8.57, totalScore: 31.57, nationalRank: null, nvRank: 3, advanced: false, tier: 'Silver' },
]

const s2223_semis = [
  { teamId: '15-1339', teamName: 'Cacada', linux: 44, cisco: 132, boeing: 59.13, web: 16, totalScore: 251.13, nationalRank: 89, tier: 'Platinum' },
  { teamId: '15-0900', teamName: 'CyberSaints', linux: 31, cisco: 76, boeing: 0, web: 0, totalScore: 107, nationalRank: 10, tier: 'Gold' },
  { teamId: '15-1333', teamName: 'The Cyberpunks :)', linux: 64, cisco: 38, boeing: 0, web: 0, totalScore: 102, nationalRank: 17, tier: 'Gold' },
  { teamId: '15-1343', teamName: 'Twilight Sparkle', linux: 31, cisco: 44, boeing: 0, web: 0, totalScore: 75, nationalRank: 81, tier: 'Gold' },
  { teamId: '15-0901', teamName: 'Port Authority 2.0', linux: 43, cisco: 26, boeing: 0, web: 0, totalScore: 69, nationalRank: 97, tier: 'Gold' },
  { teamId: '15-1334', teamName: 'Salinity', linux: 27, cisco: 38, boeing: 0, web: 0, totalScore: 65, nationalRank: 112, tier: 'Gold' },
  { teamId: '15-0899', teamName: 'Cyber curtains', linux: 40, cisco: 2, boeing: null, web: null, totalScore: 42, nationalRank: 63, tier: 'Silver' },
]

// Assemble the data structure
export const DATA = {
  '25-26': {
    teams: [...new Set([...s2526_r1, ...s2526_r2, ...s2526_state, ...s2526_semis].map(t => t.teamId))].map(id => {
      const t = [...s2526_r1, ...s2526_r2].find(x => x.teamId === id)
      const stateEntry = s2526_state.find(x => x.teamId === id)
      return { teamId: id, teamName: t?.teamName || '', tier: stateEntry?.tier || null }
    }),
    rounds: {
      'Round 1': s2526_r1,
      'Round 2': s2526_r2,
      'State': s2526_state,
      'Semi-Finals': s2526_semis,
    }
  },
  '24-25': {
    teams: [...new Set([...s2425_r1, ...s2425_r2, ...s2425_state, ...s2425_semis].map(t => t.teamId))].map(id => {
      const t = [...s2425_r1, ...s2425_r2].find(x => x.teamId === id)
      const stateEntry = s2425_state.find(x => x.teamId === id)
      return { teamId: id, teamName: t?.teamName || '', tier: stateEntry?.tier || null }
    }),
    rounds: {
      'Round 1': s2425_r1,
      'Round 2': s2425_r2,
      'State': s2425_state,
      'Semi-Finals': s2425_semis,
    }
  },
  '23-24': {
    teams: s2324_r2.map(t => ({ teamId: t.teamId, teamName: t.teamName, tier: null })),
    rounds: {
      'Round 1': [],
      'Round 2': s2324_r2,
      'State': [],
      'Semi-Finals': [],
    }
  },
  '22-23': {
    teams: [...new Set([...s2223_r1, ...s2223_r2, ...s2223_state, ...s2223_semis].map(t => t.teamId))].map(id => {
      const t = [...s2223_r1, ...s2223_r2].find(x => x.teamId === id)
      const stateEntry = s2223_state.find(x => x.teamId === id)
      return { teamId: id, teamName: t?.teamName || '', tier: stateEntry?.tier || null }
    }),
    rounds: {
      'Round 1': s2223_r1,
      'Round 2': s2223_r2,
      'State': s2223_state,
      'Semi-Finals': s2223_semis,
    }
  }
}

// Tier counts by season
export const TIER_COUNTS = {
  '22-23': { Platinum: 3, Gold: 8, Silver: 3 },
  '23-24': { Platinum: 0, Gold: 0, Silver: 0 }, // state data not in spreadsheet
  '24-25': { Platinum: 9, Gold: 4, Silver: 5 },
  '25-26': { Platinum: 4, Gold: 6, Silver: 3 },
}

export function getTier(tier) {
  if (!tier) return 'tier-none'
  if (tier === 'Platinum') return 'tier-plat'
  if (tier === 'Gold') return 'tier-gold'
  if (tier === 'Silver') return 'tier-silv'
  return 'tier-none'
}

export function getTeamTier(teamId, season) {
  const d = DATA[season]
  if (!d) return null
  const team = d.teams.find(t => t.teamId === teamId)
  return team?.tier || null
}
