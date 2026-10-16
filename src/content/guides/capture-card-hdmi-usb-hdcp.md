---
slug: "capture-card-hdmi-usb-hdcp"
title: "What limits a capture card: HDMI, USB or HDCP?"
seoTitle: "Capture Card HDMI, USB and HDCP Constraints | GameBeat"
description: "Check capture and passthrough modes, USB needs and HDCP limits before choosing a capture card. Plan a supported recording path without bypassing protection."
category: "capture"
answer: "Match the source, HDMI passthrough and capture modes separately, then check the computer connection and recording software. A supported display mode does not guarantee the same recording mode. HDCP-protected video is a separate restriction, not a bandwidth problem to solve with a faster cable."
sources: [{"title":"Elgato: Passthrough vs Capture","url":"https://www.elgato.com/us/en/explorer/products/capture/passthrough-vs-capture-whats-the-difference-on-a-capture-card"},{"title":"Elgato: HD60 X System Requirements","url":"https://help.elgato.com/hc/en-us/articles/5293623183501-Elgato-Game-Capture-HD60-X-System-Requirements"},{"title":"Elgato: Capture devices cannot capture HDCP-protected HDMI","url":"https://help.elgato.com/hc/en-us/articles/360028231151-Elgato-Game-Capture-devices-can-t-capture-HDMI-signals-protected-by-HDCP"}]
checklist: ["Write down separate play and recording modes.","Verify the required host USB connection and software.","Check HDR support independently for both paths.","Exclude protected video rather than attempting circumvention."]
question: "What limits a capture card: HDMI, USB or HDCP?"
published: "2026-10-16"
updated: "2026-10-16"
data_asof: "2026-10-16"
faq: []
---
## Which signal are you trying to preserve?

Start with two destinations, not one impressive number on a box. Your playing display receives the passthrough signal. Your recording computer receives the capture signal. Elgato distinguishes these two paths because their supported resolutions and frame rates can differ. A high-refresh playing experience and a lower-frame-rate recording can therefore be an intentional combination rather than a fault.

Write your intended resolution and rate for each path before comparing cards. Add whether HDR is required on the display, in the recording, or neither. Those requirements are not interchangeable. Elgato specifically warns that HDR passthrough and HDR capture limits can be different even on the same device. A headline that mentions HDR does not establish every combination you need.

Also identify the source you are allowed to record. Gameplay you may share, your own camera output and protected commercial video are different use cases. Technical compatibility never establishes copyright permission. This guide concerns supported equipment selection, not bypassing restrictions or obtaining rights to other people's material.

## Why does HDMI passthrough not establish capture quality?

An HDMI input receives the source; the HDMI output forwards a supported signal to a display. Capture adds a computer-facing data path and recording software. Elgato explains that the capture side has bandwidth and processing limits that need not match the passthrough side. Read both columns in the exact model's specifications instead of treating the largest number as universal.

Map the entire display chain: source output, first HDMI cable, card input and output, second HDMI cable, and monitor input. Each part must support your chosen mode. A display capable of a higher refresh rate cannot recover a mode that the capture card does not pass through. Use the manufacturer's supported-mode and cable requirements rather than inferring capability from a connector's shape.

For example, if you want a higher-refresh display but only a modest recording, reject cards that would constrain the playing path even when their recording specification is adequate. Conversely, do not pay attention only to passthrough when the actual deliverable is a higher-quality recording. The two requirements should be written as separate acceptance checks.

## What does the USB connection actually need to support?

A USB-C socket identifies a connector, not the complete supported recording configuration. Check the host port's documented data capability, the required cable and the capture device's system requirements together. Elgato's HD60 X requirements explicitly call for a built-in USB 3.0 port on Windows and a built-in USB 3.x port on Mac. That is a model-specific example, not a requirement that can be copied to every card.

Do not assume a convenient dock or adapter preserves all of the requirements. Start with the manufacturer's supported direct connection when investigating an unreliable capture path. Add other equipment only after verifying its specifications and the card's compatibility guidance. A port that powers a device or detects its name has not, by that fact alone, demonstrated a stable recording mode.

Elgato also separates operating-system, processor and graphics requirements, and notes that other recording applications can have different requirements. Its HD60 X page has different summary and detailed Windows memory guidance, so this guide deliberately does not turn one memory number into a universal recommendation. Confirm the current model, application and workload requirements before buying for an existing computer.

## How should you distinguish recording performance from a connection fault?

First establish a supported input and recording mode. Then make a short local test using content you are entitled to record. Inspect the saved file, not only the live preview. Confirm its resolution, frame rate, audio and visual continuity. A smooth playing display demonstrates that the passthrough path works; it does not prove the computer saved the requested output correctly.

Keep changes small and traceable. Note the source mode, software selection and connection used for each test. If a simpler supported mode works but the intended mode does not, revisit the official mode table, host requirements and application requirements before blaming the HDMI cable alone. This is a troubleshooting order, not a diagnosis that bandwidth must be the cause.

Preview delay is also different from the playing display's behavior. Elgato explains that a computer preview introduces capture and software processing, whereas passthrough provides a separate display path. Do not interpret a delayed preview as a measurement of the monitor's own response time or claim a universal latency figure without testing the exact setup.

## What does HDCP rule out?

HDCP is digital copy protection used with connections including HDMI. Elgato states that its capture devices cannot receive protected HDMI signals and will not display video from such a signal. More USB bandwidth, a different resolution target or a more expensive capture card does not turn protected content into an authorized capture source.

Media applications and disc players may enforce protection independently of whether a device can also produce recordable gameplay. A setup working for a game therefore does not establish that a purchased movie or streaming service will work. Treat the restriction as a boundary of the task, not as a defect that requires a workaround.

Use only the source manufacturer's supported recording features for material you have permission to share. If the desired content remains protected, stop the capture attempt and use an authorized sharing or licensing route instead. This guide does not recommend splitters, modified firmware, converters or settings intended to circumvent protected media.

## What should be on your final compatibility note?

Record the exact card model, host computer, operating system, recording application, required USB path and both video modes. Include HDR separately and keep the manufacturer's mode table with that note. This makes a return-period check concrete: the promised configuration either works for your supported use case or needs further investigation.

Read the [monitor input and refresh guide](/guides/monitor-resolution-refresh-input/) when planning the display end of the chain. For headset routing, use the [headset connection guide](/guides/headset-connection-guide/). Neither guide replaces the capture card's own audio and video support documentation. Choose the supported end-to-end configuration, not the most impressive isolated port label.
