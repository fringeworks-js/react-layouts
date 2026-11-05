import { PRIVATE, TEST_FILE } from '@fringeworks/dev';
import generateIndexFiles from '@fringeworks/dev/generateIndexFiles';

/**
 * 型テストのファイル
 * `TEST_FILE`は`*.test.*`のみを対象とするため別途除外する
 */
const TYPE_TEST_FILE = {
  valueType: 'base',
  conditions: /.*\.test-d\.(ts|tsx|js|jsx)$/i,
} as const;

/**
 * with-css の index ファイル
 */
const WITH_CSS_INDEX = 'src/with-css/index.ts';

generateIndexFiles({
  exclude: [
    PRIVATE,
    TEST_FILE,
    TYPE_TEST_FILE,
    // with-css は CSS を読み込むため、ルートからは export しない（`./with-css` から読み込む）
    {
      valueType: 'path',
      conditions: /^src\/with-css$/,
    },
  ],
  // with-css の index では、全レイアウトの CSS を一度だけ読み込み、CSS を含まないルートから export する。
  // 個別のモジュール（./withStackLayout など）はそれぞれの CSS を読み込むので、そこからは export しない
  transform: (exports, { indexPath }) => {
    if (indexPath !== WITH_CSS_INDEX) {
      return exports;
    }
    return [
      '// 全レイアウトのCSSを一度だけ読み込む',
      '// 個別のモジュール（./withStackLayout など）はそれぞれのCSSを読み込むため、re-exportはCSSを含まない側から行う',
      "import '../css/styles.scss';",
      '',
      "export * from '../index';",
    ];
  },
});
