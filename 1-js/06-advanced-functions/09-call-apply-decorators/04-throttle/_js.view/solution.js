function throttle(func, ms) {

  let isThrottled = false,
    savedArgs,
    savedThis;

  function wrapper() {

    if (isThrottled) {
      // memorizar os últimos argumentos para a chamada depois da espera
      savedArgs = arguments;
      savedThis = this;
      return;
    }

    // caso contrário vá para o estado de espera
    func.apply(this, arguments);

    isThrottled = true;

    // planea reiniciar isThrottled depois do atraso
    setTimeout(function() {
      isThrottled = false;
      if (savedArgs) {
        // se houverer chamadas, savedThis/saveArgs tem a última
        // chamada recursiva executa a função e configur a espera novamente
        wrapper.apply(savedThis, savedArgs);
        savedArgs = savedThis = null;
      }
    }, ms);
  }

  return wrapper;
}
