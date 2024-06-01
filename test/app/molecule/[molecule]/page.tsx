'use client'

import Molecule2D from '~/components/Molecule2D'
import SVG from '~/components/SVG'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-64 gap-16">
      <SVG>
        <Molecule2D
          molfile={`192899
  -OEChem-06012407542D

 81 85  0     1  0  0  0  0  0999 V2000
    2.0000    1.2312    0.0000 Mg  0  2  0  0  0  0  0  0  0  0  0  0
    8.8964   -4.5630    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0
   11.2214   -3.6496    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0
   11.4270   -1.9298    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0
   13.9407   -0.9700    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0
   12.8980   -2.3530    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0
    2.7958    0.6257    0.0000 O   0  5  0  0  0  0  0  0  0  0  0  0
    8.9881   -0.0868    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0
    7.5084   -1.4362    0.0000 N   0  5  0  0  0  0  0  0  0  0  0  0
    7.4753    1.2628    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0
    6.0268   -0.0868    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0
   10.5026   -0.5470    0.0000 C   0  0  3  0  0  0  0  0  0  0  0  0
   10.5026    0.4395    0.0000 C   0  0  3  0  0  0  0  0  0  0  0  0
    9.5804   -0.8110    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    9.2852   -1.7647    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
   11.3011   -1.1490    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    9.5474    0.7034    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    9.8348   -2.6116    0.0000 C   0  0  3  0  0  0  0  0  0  0  0  0
    8.2986   -2.0286    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
   11.2983    1.0451    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    8.0017   -2.9821    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    8.8258   -3.5656    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
   12.2216   -0.7585    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    7.0149   -2.9821    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    9.2521    1.6242    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    6.7180   -2.0616    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
   10.8277   -2.7304    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    8.2986    1.9211    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
   13.0201   -1.3605    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    6.4262   -3.7905    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    5.7644   -1.7647    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    7.9686    2.8416    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    5.4676   -0.8440    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    6.9820    2.8416    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    6.6850    1.8881    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    4.5140   -0.5800    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    5.4676    0.6705    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    8.5441    3.6594    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    5.7314    1.6242    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    4.5140    0.4066    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
   12.2143   -3.7683    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    3.7181   -1.1855    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    6.3893    3.6470    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
   14.7392   -1.5720    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    3.8445   -2.1774    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    3.7181    1.0121    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    6.7904    4.5630    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
   11.0574   -0.2704    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
   10.3852    1.0483    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
   10.8475   -1.5717    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
   11.6386   -1.6691    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
   10.1626   -2.0854    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
   11.6738    0.5517    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
   11.7917    1.4206    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
   10.9228    1.5385    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
   12.6752   -0.3358    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
   11.8841   -0.2384    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
    9.6887    2.0644    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
    5.9250   -3.4255    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
    6.0612   -4.2917    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
    6.9274   -4.1555    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
    5.3282   -2.2053    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
    9.0511    3.3026    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
    8.9009    4.1665    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
    8.0370    4.0162    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
    5.2930    2.0625    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
    3.4341   -0.6343    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
    3.1260   -1.3694    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
   12.1407   -4.3839    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
   12.8299   -3.8419    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
   12.2879   -3.1527    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
    5.7731    3.5785    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
   14.3660   -2.0670    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
   15.2343   -1.9452    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
   15.1125   -1.0769    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
    3.2295   -2.2558    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
    3.9229   -2.7925    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
    4.4596   -2.0991    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
    3.7966    1.6271    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
    7.4066    4.6316    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
    6.4229    5.0624    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
  2 22  2  0  0  0  0
  3 27  1  0  0  0  0
  3 41  1  0  0  0  0
  4 27  2  0  0  0  0
  5 29  1  0  0  0  0
  5 44  1  0  0  0  0
  6 29  2  0  0  0  0
  7 46  1  0  0  0  0
  8 14  2  0  0  0  0
  8 17  1  0  0  0  0
  9 19  1  0  0  0  0
  9 26  1  0  0  0  0
 10 28  2  0  0  0  0
 10 35  1  0  0  0  0
 11 33  1  0  0  0  0
 11 37  2  0  0  0  0
 12 13  1  0  0  0  0
 12 14  1  0  0  0  0
 12 16  1  0  0  0  0
 12 48  1  0  0  0  0
 13 17  1  0  0  0  0
 13 20  1  0  0  0  0
 13 49  1  0  0  0  0
 14 15  1  0  0  0  0
 15 18  1  0  0  0  0
 15 19  2  0  0  0  0
 16 23  1  0  0  0  0
 16 50  1  0  0  0  0
 16 51  1  0  0  0  0
 17 25  2  0  0  0  0
 18 22  1  0  0  0  0
 18 27  1  0  0  0  0
 18 52  1  0  0  0  0
 19 21  1  0  0  0  0
 20 53  1  0  0  0  0
 20 54  1  0  0  0  0
 20 55  1  0  0  0  0
 21 22  1  0  0  0  0
 21 24  2  0  0  0  0
 23 29  1  0  0  0  0
 23 56  1  0  0  0  0
 23 57  1  0  0  0  0
 24 26  1  0  0  0  0
 24 30  1  0  0  0  0
 25 28  1  0  0  0  0
 25 58  1  0  0  0  0
 26 31  2  0  0  0  0
 28 32  1  0  0  0  0
 30 59  1  0  0  0  0
 30 60  1  0  0  0  0
 30 61  1  0  0  0  0
 31 33  1  0  0  0  0
 31 62  1  0  0  0  0
 32 34  2  0  0  0  0
 32 38  1  0  0  0  0
 33 36  2  0  0  0  0
 34 35  1  0  0  0  0
 34 43  1  0  0  0  0
 35 39  2  0  0  0  0
 36 40  1  0  0  0  0
 36 42  1  0  0  0  0
 37 39  1  0  0  0  0
 37 40  1  0  0  0  0
 38 63  1  0  0  0  0
 38 64  1  0  0  0  0
 38 65  1  0  0  0  0
 39 66  1  0  0  0  0
 40 46  2  3  0  0  0
 41 69  1  0  0  0  0
 41 70  1  0  0  0  0
 41 71  1  0  0  0  0
 42 45  1  0  0  0  0
 42 67  1  0  0  0  0
 42 68  1  0  0  0  0
 43 47  2  0  0  0  0
 43 72  1  0  0  0  0
 44 73  1  0  0  0  0
 44 74  1  0  0  0  0
 44 75  1  0  0  0  0
 45 76  1  0  0  0  0
 45 77  1  0  0  0  0
 45 78  1  0  0  0  0
 46 79  1  0  0  0  0
 47 80  1  0  0  0  0
 47 81  1  0  0  0  0
M  CHG  3   1   2   7  -1   9  -1
M  END
> <PUBCHEM_COMPOUND_CID>
192899

> <PUBCHEM_COMPOUND_CANONICALIZED>
1

> <PUBCHEM_CACTVS_COMPLEXITY>
1880

> <PUBCHEM_CACTVS_HBOND_ACCEPTOR>
10

> <PUBCHEM_CACTVS_HBOND_DONOR>
0

> <PUBCHEM_CACTVS_ROTATABLE_BOND>
8

> <PUBCHEM_CACTVS_SUBSKEYS>
AAADcfB/uAAAACAAAAAAAAAAAAAAAQIECBAAAAAAAAAAAAAAAAAAHgAAAAAADQyhgAICCAIABACoA6TyTACAAAAgIgAICAEwAFgIAB4IgQAEAAAE4ACIgQOY2fKOgAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==

> <PUBCHEM_IUPAC_OPENEYE_NAME>
magnesium;[11-ethyl-3-methoxycarbonyl-22-(3-methoxy-3-oxo-propyl)-17,21,26-trimethyl-4-oxo-16-vinyl-23,24,25-triaza-7-azanidahexacyclo[18.2.1.15,8.110,13.115,18.02,6]hexacosa-1(23),2(6),5(26),8,10,13(25),14,16,18(24),19-decaen-12-ylidene]methanolate

> <PUBCHEM_IUPAC_CAS_NAME>
magnesium;[16-ethenyl-11-ethyl-3-methoxycarbonyl-22-(3-methoxy-3-oxopropyl)-17,21,26-trimethyl-4-oxo-23,24,25-triaza-7-azanidahexacyclo[18.2.1.15,8.110,13.115,18.02,6]hexacosa-1(23),2(6),5(26),8,10,13(25),14,16,18(24),19-decaen-12-ylidene]methanolate

> <PUBCHEM_IUPAC_NAME_MARKUP>
magnesium;[16-ethenyl-11-ethyl-3-methoxycarbonyl-22-(3-methoxy-3-oxopropyl)-17,21,26-trimethyl-4-oxo-23,24,25-triaza-7-azanidahexacyclo[18.2.1.1<SUP>5,8</SUP>.1<SUP>10,13</SUP>.1<SUP>15,18</SUP>.0<SUP>2,6</SUP>]hexacosa-1(23),2(6),5(26),8,10,13(25),14,16,18(24),19-decaen-12-ylidene]methanolate

> <PUBCHEM_IUPAC_NAME>
magnesium;[16-ethenyl-11-ethyl-3-methoxycarbonyl-22-(3-methoxy-3-oxopropyl)-17,21,26-trimethyl-4-oxo-23,24,25-triaza-7-azanidahexacyclo[18.2.1.15,8.110,13.115,18.02,6]hexacosa-1(23),2(6),5(26),8,10,13(25),14,16,18(24),19-decaen-12-ylidene]methanolate

> <PUBCHEM_IUPAC_SYSTEMATIC_NAME>
magnesium;[16-ethenyl-11-ethyl-3-methoxycarbonyl-22-(3-methoxy-3-oxidanylidene-propyl)-17,21,26-trimethyl-4-oxidanylidene-23,24,25-triaza-7-azanidahexacyclo[18.2.1.15,8.110,13.115,18.02,6]hexacosa-1(23),2(6),5(26),8,10,13(25),14,16,18(24),19-decaen-12-ylidene]methanolate

> <PUBCHEM_IUPAC_TRADITIONAL_NAME>
magnesium;[3-carbomethoxy-11-ethyl-4-keto-22-(3-keto-3-methoxy-propyl)-17,21,26-trimethyl-16-vinyl-23,24,25-triaza-7-azanidahexacyclo[18.2.1.15,8.110,13.115,18.02,6]hexacosa-1(23),2(6),5(26),8,10,13(25),14,16,18(24),19-decaen-12-ylidene]methanolate

> <PUBCHEM_IUPAC_INCHI>
InChI=1S/C36H36N4O6.Mg/c1-8-19-16(3)23-12-24-17(4)21(10-11-29(42)45-6)33(39-24)31-32(36(44)46-7)35(43)30-18(5)25(40-34(30)31)13-27-20(9-2)22(15-41)28(38-27)14-26(19)37-23;/h8,12-15,17,21,32H,1,9-11H2,2-7H3,(H2,37,38,39,40,41,43);/q;+2/p-2

> <PUBCHEM_IUPAC_INCHIKEY>
SJHLPLJCRTYYRJ-UHFFFAOYSA-L

> <PUBCHEM_EXACT_MASS>
642.2328765

> <PUBCHEM_MOLECULAR_FORMULA>
C36H34MgN4O6

> <PUBCHEM_MOLECULAR_WEIGHT>
643.0

> <PUBCHEM_OPENEYE_CAN_SMILES>
CCC1=C2C=C3C(=C4C(=O)C(C(=C4[N-]3)C5=NC(=CC6=NC(=CC(=N2)C1=C[O-])C(=C6C)C=C)C(C5CCC(=O)OC)C)C(=O)OC)C.[Mg+2]

> <PUBCHEM_OPENEYE_ISO_SMILES>
CCC1=C2C=C3C(=C4C(=O)C(C(=C4[N-]3)C5=NC(=CC6=NC(=CC(=N2)C1=C[O-])C(=C6C)C=C)C(C5CCC(=O)OC)C)C(=O)OC)C.[Mg+2]

> <PUBCHEM_CACTVS_TPSA>
131

> <PUBCHEM_MONOISOTOPIC_WEIGHT>
642.2328765

> <PUBCHEM_TOTAL_CHARGE>
0

> <PUBCHEM_HEAVY_ATOM_COUNT>
47

> <PUBCHEM_ATOM_DEF_STEREO_COUNT>
0

> <PUBCHEM_ATOM_UDEF_STEREO_COUNT>
3

> <PUBCHEM_BOND_DEF_STEREO_COUNT>
0

> <PUBCHEM_BOND_UDEF_STEREO_COUNT>
1

> <PUBCHEM_ISOTOPIC_ATOM_COUNT>
0

> <PUBCHEM_COMPONENT_COUNT>
2

> <PUBCHEM_CACTVS_TAUTO_COUNT>
-1

> <PUBCHEM_COORDINATE_TYPE>
1
5
255

> <PUBCHEM_BONDANNOTATIONS>
10  28  8
10  35  8
11  33  8
11  37  8
12  16  3
13  20  3
14  15  8
15  19  8
17  25  8
18  27  3
19  21  8
21  24  8
24  26  8
25  28  8
26  31  8
28  32  8
31  33  8
32  34  8
33  36  8
34  35  8
35  39  8
36  40  8
37  39  8
37  40  8
40  46  1
8  14  8
8  17  8
9  19  8
9  26  8

$$$$
`}
        />
      </SVG>
      <SVG>
        <Molecule2D
          molfile={`5429
  -OEChem-06012406252D

 21 22  0     0  0  0  0  0  0999 V2000
    3.7320    2.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0
    2.0000   -1.0000    0.0000 O   0  0  0  0  0  0  0  0  0  0  0  0
    5.5443    0.8047    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0
    3.7320   -1.0000    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0
    2.8660    0.5000    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0
    5.5443   -0.8047    0.0000 N   0  0  0  0  0  0  0  0  0  0  0  0
    4.5981    0.5000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    4.5981   -0.5000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    3.7320    1.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    2.8660   -0.5000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    6.1279    0.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    3.7320   -2.0000    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    5.8550    1.7552    0.0000 C   0  0  0  0  0  0  0  0  0  0  0  0
    6.7479   -0.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
    2.3291    0.8100    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
    3.1120   -2.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
    3.7320   -2.6200    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
    4.3520   -2.0000    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
    6.4443    1.5626    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
    6.0476    2.3446    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
    5.2656    1.9479    0.0000 H   0  0  0  0  0  0  0  0  0  0  0  0
  1  9  2  0  0  0  0
  2 10  2  0  0  0  0
  3  7  1  0  0  0  0
  3 11  1  0  0  0  0
  3 13  1  0  0  0  0
  4  8  1  0  0  0  0
  4 10  1  0  0  0  0
  4 12  1  0  0  0  0
  5  9  1  0  0  0  0
  5 10  1  0  0  0  0
  5 15  1  0  0  0  0
  6  8  1  0  0  0  0
  6 11  2  0  0  0  0
  7  8  2  0  0  0  0
  7  9  1  0  0  0  0
 11 14  1  0  0  0  0
 12 16  1  0  0  0  0
 12 17  1  0  0  0  0
 12 18  1  0  0  0  0
 13 19  1  0  0  0  0
 13 20  1  0  0  0  0
 13 21  1  0  0  0  0
M  END
> <PUBCHEM_COMPOUND_CID>
5429

> <PUBCHEM_COMPOUND_CANONICALIZED>
1

> <PUBCHEM_CACTVS_COMPLEXITY>
267

> <PUBCHEM_CACTVS_HBOND_ACCEPTOR>
3

> <PUBCHEM_CACTVS_HBOND_DONOR>
1

> <PUBCHEM_CACTVS_ROTATABLE_BOND>
0

> <PUBCHEM_CACTVS_SUBSKEYS>
AAADccBjsAAAAAAAAAAAAAAAAAAAAWAAAAAsAAAAAAAAAFgBgAAAHgAQAAAACAgBlgQHsBfMEACoAQdxdACAgC0XEKABUAGoVECASAhASCAUAIgIByJAAGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA==

> <PUBCHEM_IUPAC_OPENEYE_NAME>
3,7-dimethylpurine-2,6-dione

> <PUBCHEM_IUPAC_CAS_NAME>
3,7-dimethylpurine-2,6-dione

> <PUBCHEM_IUPAC_NAME_MARKUP>
3,7-dimethylpurine-2,6-dione

> <PUBCHEM_IUPAC_NAME>
3,7-dimethylpurine-2,6-dione

> <PUBCHEM_IUPAC_SYSTEMATIC_NAME>
3,7-dimethylpurine-2,6-dione

> <PUBCHEM_IUPAC_TRADITIONAL_NAME>
theobromine

> <PUBCHEM_IUPAC_INCHI>
InChI=1S/C7H8N4O2/c1-10-3-8-5-4(10)6(12)9-7(13)11(5)2/h3H,1-2H3,(H,9,12,13)

> <PUBCHEM_IUPAC_INCHIKEY>
YAPQBXQYLJRXSA-UHFFFAOYSA-N

> <PUBCHEM_XLOGP3>
-0.8

> <PUBCHEM_EXACT_MASS>
180.06472551

> <PUBCHEM_MOLECULAR_FORMULA>
C7H8N4O2

> <PUBCHEM_MOLECULAR_WEIGHT>
180.16

> <PUBCHEM_OPENEYE_CAN_SMILES>
CN1C=NC2=C1C(=O)NC(=O)N2C

> <PUBCHEM_OPENEYE_ISO_SMILES>
CN1C=NC2=C1C(=O)NC(=O)N2C

> <PUBCHEM_CACTVS_TPSA>
67.2

> <PUBCHEM_MONOISOTOPIC_WEIGHT>
180.06472551

> <PUBCHEM_TOTAL_CHARGE>
0

> <PUBCHEM_HEAVY_ATOM_COUNT>
13

> <PUBCHEM_ATOM_DEF_STEREO_COUNT>
0

> <PUBCHEM_ATOM_UDEF_STEREO_COUNT>
0

> <PUBCHEM_BOND_DEF_STEREO_COUNT>
0

> <PUBCHEM_BOND_UDEF_STEREO_COUNT>
0

> <PUBCHEM_ISOTOPIC_ATOM_COUNT>
0

> <PUBCHEM_COMPONENT_COUNT>
1

> <PUBCHEM_CACTVS_TAUTO_COUNT>
-1

> <PUBCHEM_COORDINATE_TYPE>
1
5
255

> <PUBCHEM_BONDANNOTATIONS>
3  11  8
3  7  8
4  10  8
4  8  8
5  10  8
5  9  8
6  11  8
6  8  8
7  8  8
7  9  8

$$$$

`}
        />
      </SVG>
    </main>
  )
}
