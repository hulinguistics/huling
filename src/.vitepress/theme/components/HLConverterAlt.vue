<template>
  <div class="HLConverterAlt">
    <div class="convbox">
      <label>
        <header>{{ status.loading ? 'Now loading...' : status.error ? 'ERROR' : list.title.left }}</header>
        <textarea
          v-model="textarea.left.value"
          cols="20"
          rows="10"
          leftta
          :readonly="!!status.loading || !!status.error"
          @focus="textarea.left.isFocus = true"
          @blur="textarea.left.isFocus = false"
        ></textarea>
      </label>
      <label>
        <header>{{ status.loading ? 'Now loading...' : status.error ? 'ERROR' : list.title.right }}</header>
        <textarea
          v-model="textarea.right.value"
          cols="20"
          rows="10"
          rightta
          :readonly="!!status.loading || !!status.error"
          @focus="textarea.right.isFocus = true"
          @blur="textarea.right.isFocus = false"
        ></textarea>
      </label>
    </div>
    <details class="details custom-block">
      <summary>{{ status.loading ? 'Now loading...' : status.error ? 'ERROR' : '優先順' }}</summary>
      <table v-if="!status.loading && !status.error">
        <thead>
          <tr>
            <th style="text-align: center">優先順</th>
            <th style="text-align: center">{{ list.title.left }}</th>
            <th style="text-align: center">{{ list.title.right }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(column, index) in list.set" :key="index">
            <td style="text-align: center">{{ index + 1 }}</td>
            <td style="text-align: center">
              <code leftta>{{ column[0] }}</code>
            </td>
            <td style="text-align: center">
              <code rightta>{{ column[1] }}</code>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="status.error" class="language-txt">
        <pre class="shiki"><code><span class="line"><span style="color:#A6ACCD;">{{ status.error }}</span></span></code></pre>
      </div>
    </details>
  </div>
</template>

<script lang="ts">
import { ref, watch } from 'vue';
import axios from 'axios';
import papa from 'papaparse';

export default {
  props: {
    src: {
      type: String,
      default: null,
    },
    fontLeft: {
      type: String,
      default: 'Noto Sans Mono',
    },
    fontRight: {
      type: String,
      default: 'Noto Sans Mono',
    },
    dirLeft: {
      type: String,
      default: 'ltr',
    },
    dirRight: {
      type: String,
      default: 'ltr',
    },
  },

  setup(props) {
    // 変換表取得関数
    let status = ref({ loading: true, error: '' });
    const getList = async (path: string) =>
      await axios
        .get(path)
        .then((response) => {
          const data: any = papa.parse(response.data.trim(), {
            quoteChar: '\\',
            delimiter: '\t',
          }).data;
          return {
            title: { left: data[0][0], right: data[0][1] },
            set: data.slice(1, data.len),
            test: converter('HELLO, WORLD!', data.slice(1, data.len)),
          };
        })
        .catch((error) => {
          console.log(error);
          status.value.error = error;
        });

    // 変換表の初期化
    const list = ref();
    (async () => {
      list.value = await getList(props.src);
      status.value.loading = false;
    })();

    // 文字変換関数
    const converter = (input: string, set: [string, string][]) => {
      let output: string = input;
      while (
        set.some((value: [string, string]) => {
          const output_old = output;
          const isReg = /\/.+\//.test(value[0]);
          const key = isReg ? value[0].replace(/\/(.+)\//, '$1') : value[0];
          if (key) {
            output = isReg ? output.replace(new RegExp(key, 'gu'), value[1]) : output.replaceAll(key, value[1]);
            return output !== output_old;
          } else {
            return false;
          }
        })
      );
      return output;
    };

    // テキストエリアの中身を更新
    const textarea = ref({
      left: { value: '', isFocus: false },
      right: { value: '', isFocus: false },
      common: { height: '200px' },
    });
    watch(
      textarea,
      () => {
        if (textarea.value.left.isFocus)
          textarea.value.right.value = converter(
            textarea.value.left.value,
            list.value.set.map((v: any) => [...v]),
          ).normalize('NFC');
        if (textarea.value.right.isFocus)
          textarea.value.left.value = converter(
            textarea.value.right.value.normalize('NFD'),
            list.value.set.map((v: any) => [...v].reverse()),
          );
      },
      { deep: true },
    );

    return {
      status,
      list,
      textarea,
    };
  },
};
</script>

<style lang="scss" scoped>
.HLConverterAlt {
  margin: 16px 0;

  .convbox {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;

    label {
      header {
        display: inline-block;
        width: 100%;
        font-size: 1.1em;
        font-weight: 600;
        margin: 0 0 16px;
        text-align: center;
      }

      textarea {
        width: 100%;
        height: 200px;
        min-height: 200px;
        padding: 15px;
        font-size: 1em;
        line-height: 1.6;
        background-color: var(--vp-c-bg-alt);
        border: 1px solid transparent;
        border-radius: 8px;
        border-color: var(--vp-custom-block-details-border);
      }
    }
  }

  [leftta] {
    font-family: v-bind(fontLeft), monospace;
    direction: v-bind(dirLeft);
  }

  [rightta] {
    font-family: v-bind(fontRight), monospace;
    direction: v-bind(dirRight);
  }
}
</style>
