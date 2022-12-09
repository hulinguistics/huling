<template>
  <div class="HLConverter">
    <div v-if="status.loading">
      <p>Now loading...</p>
    </div>
    <div v-else>
      <div class="convbox">
        <div>
          <label for="leftta">{{ list.title.left }}</label>
          <textarea
            id="leftta"
            v-model="textarea.left.value"
            cols="20"
            rows="10"
            leftta
            @focus="textarea.left.isFocus = true"
            @blur="textarea.left.isFocus = false"
          ></textarea>
        </div>
        <div>
          <label for="rightta">{{ list.title.right }}</label>
          <textarea
            id="rightta"
            v-model="textarea.right.value"
            cols="20"
            rows="10"
            rightta
            @focus="textarea.right.isFocus = true"
            @blur="textarea.right.isFocus = false"
          ></textarea>
        </div>
      </div>
      <details class="details custom-block">
        <summary>優先順</summary>
        <table>
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
      </details>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, watch } from 'vue';
import { getList, converter } from '../../utils/conv';

export default {
  props: {
    src: {
      type: String,
      default: null,
    },
    fontLeft: {
      type: String,
      default: 'Source Code Pro',
    },
    fontRight: {
      type: String,
      default: 'Source Code Pro',
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
    let status = ref({ loading: true });

    // 変換表の初期化
    const list = ref();
    (async () => {
      list.value = await getList(props.src);
      status.value.loading = false;
    })();

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
          );
        if (textarea.value.right.isFocus)
          textarea.value.left.value = converter(
            textarea.value.right.value,
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
// Source Code Pro
@import url('https://fonts.googleapis.com/css2?family=Source+Code+Pro&display=swap');

.HLConverter {
  margin: 16px 0;

  .convbox {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;

    div {
      label {
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
    font-family: v-bind(fontLeft), 'Source Code Pro', monospace;
    direction: v-bind(dirLeft);
  }

  [rightta] {
    font-family: v-bind(fontRight), 'Source Code Pro', monospace;
    direction: v-bind(dirRight);
  }
}
</style>
