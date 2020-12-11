import { useSelector } from "react-redux"
import { primaryColor } from "./theme"

function MainStyle() {
  const lang = useSelector(s => s.settings.language)
  return (
    <>
      <style jsx global>
        {`
          @font-face {
            font-family: yekan;
            src: url('/assets/fonts/YekanBakh-Regular.woff');
          }

          html, body, div, span, applet, object, iframe,
          h1, h2, h3, h4, h5, h6, p, blockquote, pre,
          a, abbr, acronym, address, big, cite, code,
          del, dfn, em, img, ins, kbd, q, s, samp,
          small, strike, strong, sub, sup, tt, var,
          b, u, i, center,
          dl, dt, dd, ol, ul, li,
          fieldset, form, label, legend,
          table, caption, tbody, tfoot, thead, tr, th, td,
          article, aside, canvas, details, embed, 
          figure, figcaption, footer, header, hgroup, 
          menu, nav, output, ruby, section, summary,
          time, mark, audio, video {
            margin: 0;
            padding: 0;
            border: 0;
            font-size: 100%;
            font: inherit;
            vertical-align: baseline;
          }
          /* HTML5 display-role reset for older browsers */
          article, aside, details, figcaption, figure, 
          footer, header, hgroup, menu, nav, section {
            display: block;
          }
          body {
            line-height: 1;
          }
          ol, ul {
            list-style: none;
          }
          blockquote, q {
            quotes: none;
          }
          blockquote:before, blockquote:after,
          q:before, q:after {
            content: '';
            content: none;
          }
          table {
            border-collapse: collapse;
            border-spacing: 0;
          }

          * {
            box-sizing: border-box;
            font-family: yekan !important;
          }

          body, html, #__next {
            height: 100%;
          }

          body {
            direction: ${lang === 'Fa' ? 'rtl': 'ltr'};
          }

          a {
            text-decoration: none;
            padding: 3px 20px;
          }

          .primary-btn {
            border-radius: 5px;
            background-color: ${primaryColor};
            color: black !important;
            outline: none;
            border: none;
          }
          .primary-btn:hover {
            opacity: 0.98;
          }
          .primary-btn:focus {
            outline: none;
            border: none;
          }

          .btn-active {
            color: ${primaryColor} !important;
          }

          .btn-transparent, .btn-transparent:focus {
            outline: none;
            border: none;
            background: none;
            color: white;
            cursor: pointer;
            padding: 3px 20px;
          }

          .btn-transparent:hover {
            color: ${primaryColor};
          }

          .m-auto {
            margin: auto !important;
          }

          .h-100{
            height: 100%;
          }

          .d-flex {
            display: flex;
          }
          .flex-row {
            display: flex;
            flex-direction: row;
          }
          .flex-row-reverse {
            display: flex;
            flex-direction: row-reverse;
          }

          .flex-column {
            display: flex;
            flex-direction: column;
          }

          .d-block {
            display: block;
          }

          .justify-content-center {
            display: flex;
            justify-content: center;
          }

          .justify-content-between {
            justify-content: space-between !important;
          }

          .align-items-center {
            align-items: center;
          }

          .w-100 {
            width: 100% !important;
          }
        `}
      </style>
    </>
  )
}

export default MainStyle
