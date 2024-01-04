
const TouchEventExample = () => {
  const handleTouchStart = (e) => {
    console.log('Touch Start:', e.touches[0].clientX, e.touches[0].clientY);
  };
  const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;

  if (isTouchDevice) {
    console.log('이 디바이스는 터치 이벤트를 지원합니다.');
  } else {
    console.log('이 디바이스는 터치 이벤트를 지원하지 않습니다.');
  }
  return (
    <div
      onTouchStart={handleTouchStart}
      style={{ width: '100px', height: '100px', backgroundColor: 'lightblue' }}
    >
      Touch Me
    </div>
  );
};

export default TouchEventExample;