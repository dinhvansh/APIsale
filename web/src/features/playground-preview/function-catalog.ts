export type Field = {
  key: string
  label: string
  hint?: string
  kind: 'text' | 'textarea' | 'audio' | 'image' | 'song' | 'number'
  required?: boolean
  placeholder?: string
}
export type StudioFunction = {
  id: string
  endpoint: string
  name: string
  description: string
  input: string
  output: string
  fields: Field[]
  prompt?: string
  result?: 'audio' | 'stems' | 'lyrics' | 'file'
}
const idea: Field = {
  key: 'prompt',
  label: 'Ý tưởng bài hát',
  kind: 'textarea',
  required: true,
  placeholder:
    'Một bài hát acoustic về chuyến đi cùng bạn bè, giai điệu vui tươi...',
}
const lyrics: Field = {
  key: 'lyrics',
  label: 'Lời bài hát',
  kind: 'textarea',
  required: true,
  placeholder: '[Verse]\nViết lời bài hát của bạn tại đây...\n\n[Chorus]\n...',
}
const style: Field = {
  key: 'style',
  label: 'Phong cách âm nhạc',
  kind: 'text',
  required: true,
  placeholder: 'Acoustic, piano ấm áp, giọng nữ...',
}
const title: Field = {
  key: 'title',
  label: 'Tên bài hát',
  kind: 'text',
  required: true,
  placeholder: 'Một sớm bình yên',
}
const audio: Field = {
  key: 'audio',
  label: 'Tệp âm thanh gốc',
  kind: 'audio',
  required: true,
  hint: 'Tệp chỉ được chọn trên thiết bị để xem trước, chưa tải lên máy chủ.',
}
const song: Field = {
  key: 'song',
  label: 'Chọn bài hát gốc',
  kind: 'song',
  required: true,
  hint: 'Chọn một bài hát mẫu. Khi kết nối API, đây sẽ là các bài bạn đã tạo.',
}
export const sunoFunctions: StudioFunction[] = [
  {
    id: 'music-idea',
    endpoint: 'suno/generate',
    name: 'Tạo bài hát từ ý tưởng',
    description:
      'Mô tả chủ đề, cảm xúc và phong cách. AI sáng tác bài hát mới.',
    input: 'Ý tưởng',
    output: 'Bài hát mới',
    fields: [idea],
    result: 'audio',
  },
  {
    id: 'music-lyrics',
    endpoint: 'suno/generate',
    name: 'Phổ nhạc lời có sẵn',
    description: 'Đưa lời của bạn vào một bài hát với phong cách tự chọn.',
    input: 'Lời bài hát',
    output: 'Bài hát có lời',
    fields: [title, style, lyrics],
    result: 'audio',
  },
  {
    id: 'add-vocals',
    endpoint: 'suno/add-vocals',
    name: 'Thêm giọng hát',
    description: 'Thêm phần hát vào bản nhạc nền bạn đã có.',
    input: 'Nhạc nền + lời',
    output: 'Bài hát có giọng',
    fields: [{ ...audio, label: 'Bản nhạc nền' }, lyrics, style],
    result: 'audio',
  },
  {
    id: 'add-instrumental',
    endpoint: 'suno/add-instrumental',
    name: 'Thêm nhạc nền',
    description: 'Tạo phần hòa âm cho bản thu giọng hát của bạn.',
    input: 'Giọng hát',
    output: 'Giọng hát + nhạc nền',
    fields: [{ ...audio, label: 'Bản thu giọng hát' }, style],
    result: 'audio',
  },
  {
    id: 'cover',
    endpoint: 'suno/upload-cover',
    name: 'Đổi phong cách bài hát',
    description: 'Tạo phiên bản cover từ tệp âm thanh có sẵn.',
    input: 'Âm thanh gốc',
    output: 'Phiên bản mới',
    fields: [audio, title, style],
    result: 'audio',
  },
  {
    id: 'extend',
    endpoint: 'suno/extend',
    name: 'Kéo dài bài hát',
    description: 'Viết tiếp một đoạn nhạc từ bài hát đã tạo.',
    input: 'Bài hát gốc',
    output: 'Đoạn nhạc nối tiếp',
    fields: [
      song,
      {
        key: 'continueAt',
        label: 'Nối tiếp từ giây',
        kind: 'number',
        required: true,
        placeholder: '30',
      },
      { ...idea, label: 'Ý tưởng cho đoạn tiếp theo', required: false },
    ],
    result: 'audio',
  },
  {
    id: 'upload-extend',
    endpoint: 'suno/upload-extend',
    name: 'Kéo dài tệp âm thanh',
    description: 'Tải bản nhạc của bạn lên và sáng tác phần tiếp theo.',
    input: 'Tệp âm thanh',
    output: 'Đoạn nhạc nối tiếp',
    fields: [
      audio,
      title,
      style,
      {
        key: 'continueAt',
        label: 'Nối tiếp từ giây',
        kind: 'number',
        required: true,
        placeholder: '30',
      },
    ],
    result: 'audio',
  },
  {
    id: 'separate',
    endpoint: 'suno/vocal-separation',
    name: 'Tách giọng và nhạc nền',
    description: 'Tách bài đã tạo thành phần giọng hát và phần nhạc nền.',
    input: 'Bài hát gốc',
    output: 'Giọng hát / nhạc nền',
    fields: [song],
    result: 'stems',
  },
  {
    id: 'lyrics',
    endpoint: 'suno/lyrics',
    name: 'Viết lời bài hát',
    description: 'Từ một chủ đề, nhận phần lời để phát triển thành bài hát.',
    input: 'Chủ đề',
    output: 'Lời bài hát',
    fields: [
      {
        ...idea,
        label: 'Chủ đề và cảm xúc',
        placeholder:
          'Một bài hát về tuổi trẻ và những chuyến đi, lời tiếng Việt...',
      },
    ],
    result: 'lyrics',
  },
  {
    id: 'wav',
    endpoint: 'suno/wav',
    name: 'Xuất âm thanh WAV',
    description: 'Chọn bài đã tạo để xem luồng xuất tệp âm thanh WAV.',
    input: 'Bài hát gốc',
    output: 'Tệp WAV',
    fields: [song],
    result: 'file',
  },
]
export function getStudioFunctions(model: {
  id: string
  category: string
}): StudioFunction[] {
  if (model.id.startsWith('suno/')) return sunoFunctions
  if (model.category === 'video') {
    return [
      {
        id: 'text-video',
        endpoint: model.id,
        name: 'Tạo video từ mô tả',
        description: 'Bắt đầu bằng ý tưởng và để AI dựng cảnh.',
        input: 'Văn bản',
        output: 'Video',
        fields: [],
      },
      {
        id: 'image-video',
        endpoint: model.id,
        name: 'Tạo video từ ảnh',
        description: 'Thêm chuyển động vào ảnh đầu vào của bạn.',
        input: 'Ảnh + mô tả',
        output: 'Video',
        fields: [
          { key: 'image', label: 'Ảnh bắt đầu', kind: 'image', required: true },
        ],
      },
    ]
  }
  if (model.category === 'image') {
    return [
      {
        id: 'text-image',
        endpoint: model.id,
        name: 'Tạo ảnh từ mô tả',
        description: 'Mô tả chủ thể, phong cách và ánh sáng bạn mong muốn.',
        input: 'Văn bản',
        output: 'Hình ảnh',
        fields: [],
      },
      {
        id: 'edit-image',
        endpoint: model.id,
        name: 'Chỉnh sửa ảnh có sẵn',
        description: 'Chọn ảnh và mô tả những thay đổi bạn muốn thực hiện.',
        input: 'Ảnh + yêu cầu',
        output: 'Ảnh đã chỉnh sửa',
        fields: [
          {
            key: 'image',
            label: 'Ảnh cần chỉnh sửa',
            kind: 'image',
            required: true,
          },
        ],
      },
    ]
  }
  if (model.category === 'chat') {
    return [
      {
        id: 'chat',
        endpoint: model.id,
        name: 'Trò chuyện với AI',
        description: 'Đặt câu hỏi, viết nội dung hoặc nhờ AI phân tích.',
        input: 'Câu hỏi',
        output: 'Câu trả lời',
        fields: [],
      },
    ]
  }
  return [
    {
      id: 'clean-image',
      endpoint: model.id,
      name: 'Làm sạch hình ảnh',
      description: 'Chọn ảnh bạn có quyền chỉnh sửa và mô tả phần cần xử lý.',
      input: 'Hình ảnh',
      output: 'Ảnh đã xử lý',
      fields: [
        { key: 'image', label: 'Ảnh cần xử lý', kind: 'image', required: true },
      ],
    },
  ]
}
